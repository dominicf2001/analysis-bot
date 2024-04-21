import scrape_to_json as scrape_to_json
import process_messages as process_messages
import evaluate_messages as evaluate_messages

def get_chat_evaluation(user_id):
    scrape_to_json.scrape_to_json()

    json_data = process_messages.load_json_file()

    process_messages.tokens_to_csv(process_messages.process_user_messages(user_id, json_data), 'sentiment_evaluation.csv')

    report = evaluate_messages.evaluate_data()
    final_count = evaluate_messages.count_evaluations(report)
    print(final_count)