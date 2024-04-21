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

def total_server_values():
    response = []

    res = request.get_json()
    if not res or 'channelIds' not in res:
        return jsonify({'error': 'Missing or channelIds in request'}), 400
    
    userIds = res['userIds']
    channelIds = res['channelIds']

    positivity_total = 0
    neutral_total = 0
    negativity_total = 0

    for channelId in channelIds:
        for userId in userIds:
            totals = get_chat_evaluation(str(userId), str(channelId))
            if len(totals) >= 3:
                positivity_total += totals[0][1]
                neutral_total += totals[1][1]
                negativity_total += totals[2][1]


    response.append({
        'positivity': positivity_total,
        'neutral': neutral_total,
        'negativity': negativity_total
    })

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
