const sample_chat = [
  {
    "prompt": "what is python",
    "answer": `
    Python is a high-level, general-purpose programming language that can be used for a wide variety of applications. Here are some key points about Python:

    - Interpreted Language - Python is an interpreted language, which means it doesn't need to be compiled before execution. This makes the development process quick and flexible.

    - Easy to Learn - Python has a very simple and elegant syntax that is easy for beginners to learn and yet powerful enough for experienced programmers.

    - Cross-platform - Python code can run on various operating systems like Windows, Linux and macOS. This makes Python portable across platforms.

    - Open Source - Python is open source software maintained by the non-profit Python Software Foundation. It's free to use and distribute.

    - Object Oriented - Python supports object-oriented programming which allows code reuse and modular programming.

    - Extensive Libraries - Python has a huge collection of standard and external libraries and frameworks like NumPy, Pandas, Django, Flask etc. This makes nearly every task achievable in Python.

    - High-level Language - Python abstracts away low-level details like memory management. This allows developers to focus on core functionality rather than nitty-gritty details.

    - Dynamic Typing - Variables in Python don't require explicit declaration. The type is resolved at runtime which makes Python very flexible.

    In summary, Python is a versatile, easy to learn and powerful programming language used for web development, data analysis, AI, machine learning and much more. Its simple syntax, dynamic typing and extensive libraries allow rapid development of robust applications.
    `
  },
  {
    "prompt": "how to learn python?",
    "answer": `
    Here are some effective ways to learn Python:

    - Take an interactive Python course or tutorial. Codecademy, DataCamp, and SoloLearn have great hands-on beginner Python courses.

    - Go through the official Python documentation and user guide. The tutorials cover the core language and standard library.

    - Practice Python coding exercises on sites like HackerRank, LeetCode, and CodeWars to improve your skills. Start basic and move up to harder challenges.

    - Build your own projects. Start small and create things like a calculator, mad libs game, or text-based adventure. Then build up to more complex programs.

    - Read Python books like Automate the Boring Stuff, Python Crash Course, or Head-First Python. These will teach fundamentals and popular libraries.

    - Watch Python YouTube tutorial playlists. Corey Schafer, CS Dojo, and Mike Dane have great content for beginners.

    - Contribute to open source Python projects on GitHub. Reading and improving code is a great way to advance.

    - Explore Python web frameworks like Django and Flask to build web apps and sites.

    - Learn Python data analysis libraries like Pandas, NumPy, Matplotlib, and Seaborn.

    - Build a portfolio of Python projects to showcase your skills on GitHub.

    The key is to practice Python coding regularly. Learn the basics then apply your knowledge by building projects. Be curious, persistent, and don't afraid to experiment as you code.
    `
  },
  {
    "prompt": "give me a sample python code",
    "answer": `
          Here is a simple Python code sample that prints "Hello World!":

      \`\`\`python
          # This is a comment

          print("Hello World!")

          # Print function prints the text in quotes

          name = "John" # String variable
          age = 25 # Numeric variable

          print("My name is", name, "and I am", age, "years old.")

          # Strings can be concatenated with +
      print("Hello " + name + ", nice to meet you!")

          # Asking user to input their name
          name = input("Enter your name: ")
          print("Hello", name)

          # Indentation is important in Python
          if age > 18:
    print(name, "is over 18.")
          else:
      print(name, "is under 18.")

          # For loop
          for x in range(5):
    print(x)

          # Imports math module
          import math
          print("Square root of 16 is", math.sqrt(16))
      \`\`\`

          This covers:

      - Comments
      - Print function
          - Variables
      - String concatenation
          - User input
  - If /else statements
  - For loops
  - Importing modules

          This is just a basic intro, but it shows the core concepts and syntax of Python programming.Play around with the code example to understand it better.
        `
  }]

export default sample_chat
