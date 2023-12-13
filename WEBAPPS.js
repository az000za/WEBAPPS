class WEBAPPS {
  Apps = {};
  webAppLinks = [];
  constructor(webAppLinks){
      this.webAppLinks = webAppLinks;
      this.fetchAPPS(webAppLinks);
  }
  async fetchAPPS(webAppLinks){
      for (const url of webAppLinks) {
        await this.fetchApp(url);
      }
      console.log(this.Apps);
  }
  async fetchApp(url){
    fetch(url, {
          mode: "no-cors"
        })
        .then(response => response.text())
        .then(this.parseHTMLAPP)
        .catch(error => console.error('Error importing HTML file:', url));
  }
  async useAPP(appName){
    return this.Apps[appName];
  }
  parseHTMLAPP(webAppLink){
    const url = webAppLink;
    const fileName = filePath.slice().split('/').pop();
    const _html_ = data;
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(_html_, 'text/html');
    const body = doc.body.cloneNode(true);
    console.log("imported ", filePath);
    console.log(html);
    const AppName = fileName.split(".").slice().shift();
    const html = this.parseHTML(htmlDoc);
    const css = this.parseCSS(htmlDoc);
    const javascript = this.parseJavaScript(htmlDoc);
    Apps[AppName] = function(){                        
      return new class _ {
        peerID = 0;  // needs to generated
        html = html;
        css = css;
        javascript = javascript;
        constructor(){
          
        }
        init(){
          console.error("init unprogrammed");          
        }
        load(){
          console.error("load unprogrammed");
        }
        refresh(){
          console.error("refresh unprogrammed");
        }
        stop(){
          console.error("stop unprogrammed");
        }
        permissions(){
          console.error("permissions unprogrammed");
        }
        renderGenericUI(){
          console.error("renderGenericUI unprogrammed");
        }
        renderCustomUI(){
          console.error("renderCustomUI unprogrammed");
        }
        updateUI(){
          console.error("update unprogrammed");
        }
      }
    }
    console.log("AppName", AppName);
  }
  parseHTML(htmlDoc){
    const templateTags = htmlDoc.querySelectorAll('body');
    templateTags.forEach((templateTag, index)=>{
      console.log(`Script ${index + 1}:`);
      console.log(templateTag.textContent); // Extract the html code      
    });
  }
  parseCSS(htmlDoc){
      const scriptTags = htmlDoc.querySelectorAll('script');
      styleTags.forEach((styleTag, index)=>{
        console.log(`Script ${index + 1}:`);
        console.log(styleTag.textContent); // Extract the style code      
      });
  }
  parseJavaScript(htmlDoc){
      const scriptTags = htmlDoc.querySelectorAll('script');
      // Loop through each script tag
      scriptTags.forEach((scriptTag, index) => {
          const scriptContent = scriptTag.textContent;
          // Class declaration extraction
          const classRegex = /class\s+([a-zA-Z0-9_$]+)\s*\{(.*?)\}(?:;|$)/gm;
          let classMatch;
          while ((classMatch = classRegex.exec(scriptContent))) {
              const globalFunctions = this.extractGlobalScopeFunctions(scriptContent);
              const globalClasses   = this.extractGlobalClassFunctions(scriptContent);
              const globalVariables = this.extractGlobalVariables(scriptContent);    
              this.Apps[AppName]["javascript"] = {
                  globalVariables,
                  globalFunctions,
                  globalClasses,
              };
          }
      });
  }
  extractGlobalScopeVariables(scriptContent) {
      // Initialize an empty array to store extracted variables
      let variables = {};
      const variableRegex = /(?<!\bfunction\b)\b(var|let|const)\s+([a-zA-Z$_0-9]+)(?=\s*=\s*|,$)/gm;
      const matches = scriptContent.match(variableRegex);
      if (matches) {
        // Push each extracted variable name to the variables array
        matches.forEach(match => {
          variables[match] = match.split(/\s+/)[1]
        });
      }
      return variables;
  }
  extractGlobalScopeFunctions(scriptContent){
      // Function declaration extraction
      let functions = {};
      const functionRegex = /function\s+([a-zA-Z0-9_$]+)\s*\((.*?)\)\s*\{(.*?)\}(?:;|$)/gm;
      let functionMatch;
      while ((functionMatch = functionRegex.exec(scriptContent))) {
        const functionName = functionMatch[1];
        const functionParameters = functionMatch[2];
        const functionBody = functionMatch[3];
        functions[functionName] = new Function(functionParameters, functionBody);
      }
      return functions;
  }
  extractGlobalClasses(scriptContent) {
    // Regular expression to match class definitions
    const classRegex = /class\s+([A-Za-z0-9]+)\s*{(.*?)}(?=^\s*$|^\s*class)/gm;
    // Extract class names and definitions
    let classes = {};
    let match;
    while ((match = classRegex.exec(scriptContent))) {
      const className = match[1];
      const classDefinition = match[2];
      classes[className] = classDefinition;
    }
    return classes;
  }
}
