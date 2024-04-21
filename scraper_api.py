import scrape_to_json as scrape_to_json
import process_messages as process_messages
import evaluate_messages as evaluate_messages



def get_chat_evaluation(user_id, channel_id):
    with open("bot_token.txt", "r") as token_file:
        bot_token = token_file.readline().strip()

    scrape_to_json.scrape_to_json(bot_token, channel_id)

    json_data = process_messages.load_json_file()

    process_messages.tokens_to_csv(process_messages.process_user_messages(user_id, json_data), 'sentiment_evaluation.csv')

    report = evaluate_messages.evaluate_data()
    final_count = evaluate_messages.count_evaluations(report)

    return final_count

def get_weekly_counts(user_id, channel_id):
    with open("bot_token.txt", "r") as token_file:
        bot_token = token_file.readline().strip()

    scrape_to_json(bot_token, channel_id)
    
    json_data = process_messages.load_json_file()

    process_messages.tokens_to_csv(process_messages.process_user_messages(user_id, json_data), 'sentiment_evaluation.csv')

    report = evaluate_messages.evaluate_data()



