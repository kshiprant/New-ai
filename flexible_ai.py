# -------------------------------
# Flexible Human-Aware AI Skeleton
# -------------------------------

import random

class FlexibleAI:
    def __init__(self, memory_limit=10):
        # Store conversation history and context
        self.context = {
            'history': [],          # last user messages
            'user_profile': {}      # optional: store user preferences, name, etc.
        }
        self.memory_limit = memory_limit

    # ---------- Context Management ----------
    def update_context(self, user_input):
        """Add input to history while keeping memory limit."""
        self.context['history'].append(user_input)
        if len(self.context['history']) > self.memory_limit:
            self.context['history'].pop(0)

    # ---------- Intent Detection ----------
    def analyze_intent(self, user_input):
        """Classify input into technical, emotional, or general."""
        technical_keywords = ['code', 'Python', 'function', 'script', 'algorithm']
        emotional_keywords = ['feel', 'confused', 'understand', 'frustrated', 'stuck']

        input_lower = user_input.lower()
        if any(word in input_lower for word in technical_keywords):
            return 'technical'
        elif any(word in input_lower for word in emotional_keywords):
            return 'emotional'
        else:
            return 'general'

    # ---------- Response Generation ----------
    def generate_response(self, user_input):
        self.update_context(user_input)
        intent = self.analyze_intent(user_input)

        if intent == 'technical':
            return self.technical_response(user_input)
        elif intent == 'emotional':
            return self.emotional_response(user_input)
        else:
            return self.general_response(user_input)

    # ---------- Response Modules ----------
    def technical_response(self, user_input):
        """Handle coding or technical queries."""
        responses = [
            "Let's break down your Python/code query step by step.",
            "I can guide you through this coding challenge. Can you give me more details?",
            "We can solve this together. Let's approach it methodically."
        ]
        return random.choice(responses)

    def emotional_response(self, user_input):
        """Handle emotional or understanding-related queries."""
        responses = [
            "I understand, let's take it one step at a time.",
            "Don't worry, we can clarify this together.",
            "It's normal to feel confused. Let's work through it carefully."
        ]
        return random.choice(responses)

    def general_response(self, user_input):
        """Handle general queries."""
        responses = [
            "Here's some information based on what you asked.",
            "I can provide guidance or examples if you like.",
            "Let's explore this topic together."
        ]
        return random.choice(responses)

    # ---------- Optional: Show Context ----------
    def show_context(self):
        return self.context

# -------------------------------
# Example Usage
# -------------------------------

if __name__ == "__main__":
    ai = FlexibleAI(memory_limit=5)
    
    print("AI: Hello! I'm your assistant. How can I help today?\n")
    
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit']:
            print("AI: Goodbye! Happy learning.")
            break
        response = ai.generate_response(user_input)
        print(f"AI: {response}\n")
