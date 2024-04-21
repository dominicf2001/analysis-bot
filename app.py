from flask import Flask, jsonify, request

from scraper_api import get_chat_evaluation


app = Flask(__name__)

# ==========================================================================

@app.route('/users', methods=["POST"])
def users():
    response = []

    res = request.get_json()
    if not res or 'userIds' not in res or 'channelIds' not in res:
        return jsonify({'error': 'Missing userIds or channelIds in request'}), 400

    userIds = res['userIds']
    channelIds = res['channelIds']

    for channelId in channelIds:
        for userId in userIds:
            totals = get_chat_evaluation(str(userId), str(channelId))
            if len(totals) >= 3:
                positivity = totals[0][1]
                neutral = totals[1][1]
                negativity = totals[2][1]
                response.append({
                    'userId': userId,
                    'positivity': positivity,
                    'neutral': neutral,
                    'negativity': negativity
                })

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
