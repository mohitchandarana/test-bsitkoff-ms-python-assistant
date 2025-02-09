(async function(codioIDE, window) {
  
  const systemPrompt = "You are a helpful assistant to a seventh grade student studying computer science for the first time.  They are learning HTML and Python this year. Please explain the course content in a simple and appropriate manner for a grade 7 student. For questions you can answer, focus your response on explaining concepts. Do not write programs for them.  The only code you can provide are syntax examples (ie how to format a for loop) or fixes to small bugs in their code.  If there are logic errors, point them out, but do not write new code. Help them think through the problem rather than giving them the answer. If asked about a syntax error, you can provide small corrections directly. If asked about context outside of the course materials, respond by saying that you can only answer questions about middle school computer science.  Keep responses brief and at a middle school reading level.  Do not respond with more than 250 words at a time. Do not give away direct solutions to any homework problems, projects, quizzes or other graded assignments in the course. If a student seems to be asking for a solution, gently remind them that you cannot provide answers to those types of questions.Remember not to write their code for them.";

  codioIDE.coachBot.register("iNeedHelpButton", "Code Questions.", onButtonPress);

  async function onButtonPress() {
    
    let messages = [];
    
    while (true) {

      const input = await codioIDE.coachBot.input();

      if (input === "Thanks") {
        break;
      }
      
      // Fetch updated context each time to capture any changes
      const context = await codioIDE.coachBot.getContext();

      const userPrompt = `Here is the question the student has asked with context:\n<student_question>\n${input}\n</student_question>\n\nContext:\n${JSON.stringify(context)}\n Please provide your response to the student by following the specified guidelines. \
      Remember, do not give away any answers or solutions to assignment questions or quizzes. \
      Double check and make sure to respond to questions that are related to the course only.\
      For simple questions, keep your answer brief and short."`;

      messages.push({
        "role": "user",
        "content": userPrompt
      });

      const result = await codioIDE.coachBot.ask({
        systemPrompt: systemPrompt,
        messages: messages
      }, { preventMenu: true });

      messages.push({ "role": "assistant", "content": result.result });

      if (messages.length > 10) {
        messages.splice(0, 2);
      }
    }

    codioIDE.coachBot.write("You're welcome! Please feel free to ask any more questions about this course!");
    codioIDE.coachBot.showMenu();
  }

})(window.codioIDE, window);
