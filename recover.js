import fs from 'fs';
const logPath = 'C:\\Users\\yashh\\.gemini\\antigravity\\brain\\2ca6d6d8-c076-4072-ae41-6069c9ed32f0\\.system_generated\\logs\\transcript.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').split('\n');

const filesToRecover = [
  'Hero.jsx',
  'BrandStory.jsx',
  'Navbar.jsx',
  'Loader.jsx',
  'App.jsx',
  'main.jsx',
  'index.html'
];
const recoveredFiles = {};

for (const line of lines) {
  if (!line) continue;
  try {
    const step = JSON.parse(line);
    if (step.type === 'TOOL_RESPONSE' || step.source === 'TOOL') {
       // Gemini trajectories usually put tool outputs here
       // Check step.tool_calls or step.tool_responses or step.content
       const responseStr = JSON.stringify(step);
       
       for (const file of filesToRecover) {
          if (responseStr.includes(file) && responseStr.includes('The following code has been modified') && !recoveredFiles[file]) {
             
             // Extract from step.content or step.tool_responses
             let output = '';
             if (step.content) output = step.content;
             if (step.tool_responses && step.tool_responses[0]) output = step.tool_responses[0].output;
             if (!output && step.response && step.response.output) output = step.response.output;
             
             // In transcript, the content might be a stringified JSON if it's raw
             const linesArr = typeof output === 'string' ? output.split('\n') : responseStr.split('\\n');
             
             let startExtracting = false;
             let extractedText = [];
             for (let i = 0; i < linesArr.length; i++) {
                if (linesArr[i].includes('The following code has been modified')) {
                   startExtracting = true;
                   continue;
                }
                if (startExtracting) {
                   if (linesArr[i].includes('The above content shows the entire, complete file contents')) {
                      break;
                   }
                   const cleanLine = linesArr[i].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                   const match = cleanLine.match(/^\d+:\s?(.*)$/);
                   if (match) {
                      extractedText.push(match[1]);
                   } else {
                      extractedText.push(cleanLine);
                   }
                }
             }
             
             if (extractedText.length > 0) {
                recoveredFiles[file] = extractedText.join('\n');
                console.log('Recovered ' + file);
             }
          }
       }
    }
  } catch (e) {}
}

for (const file of Object.keys(recoveredFiles)) {
  fs.writeFileSync('d:\\sanjbagh\\src\\components\\' + file, recoveredFiles[file]);
  console.log('Wrote ' + file);
}
if (recoveredFiles['App.jsx']) fs.renameSync('d:\\sanjbagh\\src\\components\\App.jsx', 'd:\\sanjbagh\\src\\App.jsx');
if (recoveredFiles['main.jsx']) fs.renameSync('d:\\sanjbagh\\src\\components\\main.jsx', 'd:\\sanjbagh\\src\\main.jsx');
if (recoveredFiles['index.html']) fs.renameSync('d:\\sanjbagh\\src\\components\\index.html', 'd:\\sanjbagh\\index.html');
