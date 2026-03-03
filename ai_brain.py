import json
import random

class AIBrain:
    def __init__(self, memory_file='ai_memory.json'):
        # Load persistent memory if exists
        self.memory_file = memory_file
        try:
            with open(memory_file, 'r') as f:
                self.context = json.load(f)
        except FileNotFoundError:
            self.context = {'history': [], 'knowledge': {}, 'user_profile': {}}

    # ---------- Memory ----------
    def remember(self, key, value):
        self.context[key] = value
        self.save_memory()

    def recall(self, key):
        return self.context.get(key, None)

    def save_memory(self):
        with open(self.memory_file, 'w') as f:
            json.dump(self.context, f, indent=2)

    # ---------- Knowledge ----------
    def learn_fact(self, topic, info):
        self.context['knowledge'][topic] = info
        self.save_memory()

    def get_fact(self, topic):
        return self.context['knowledge'].get(topic, "I don't know about that yet.")

    # ---------- Reasoning ----------
    def reason(self, user_input):
        if "Python" in user_input or "code" in user_input:
            return "technical"
        elif "feel" in user_input or "understand" in user_input:
            return "emotional"
        else:
            return "general"

    # ---------- Response ----------
    def generate_response(self, user_input):
        intent = self.reason(user_input)
        if intent == 'technical':
            return self.get_fact('Python') or "Let's solve this coding problem together."
        elif intent == 'emotional':
            return "I understand your frustration. Let's take it step by step."
        else:
            return "Here's what I know about that topic."

# ---------- Example Usage ----------
if __name__ == "__main__":
    brain = AIBrain()
    brain.learn_fact('Python', 'Python is a versatile programming language.')
    
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit']:
            print("AI: Goodbye!")
            break
        print("AI:", brain.generate_response(user_input))
