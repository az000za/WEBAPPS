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
  }
  async fetchApp(url){
    fetch(url, {
          mode: "no-cors"
        })
        .then(response => response.text())
        .then(this.parseAPP)
        .catch(error => console.error('Error importing HTML file:', url));
  }
  async useAPP(appName){
    
  }
  parseAPP(webAppLink){
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
    console.log("AppName", AppName);
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
           this.extractGlobalScopeFunctions({}, scriptContent);
           this.extractGlobalClassFunctions({}, scriptContent);
           this.extractGlobalVariables({}, scriptContent);    
            this.Apps[AppName]["javascript"] = {
              globalVariables,
              functions,
              classes,
            };
      });
  }
  extractGlobalScopeVariables(variables, scriptContent) {
    // Initialize an empty array to store extracted variables
    variables = [];
    const variableRegex = /(?<!\bfunction\b)\b(var|let|const)\s+([a-zA-Z$_0-9]+)(?=\s*=\s*|,$)/gm;
    const matches = scriptContent.match(variableRegex);
    if (matches) {
      // Push each extracted variable name to the variables array
      matches.forEach(match => {
        variables[match] = match.split(/\s+/)[1]
      });
    }
  }
  extractGlobalScopeFunctions(functions, scriptContent){
        // Function declaration extraction
        const functions = {};
        const functionRegex = /function\s+([a-zA-Z0-9_$]+)\s*\((.*?)\)\s*\{(.*?)\}(?:;|$)/gm;
        let functionMatch;
        while ((functionMatch = functionRegex.exec(scriptContent))) {
          const functionName = functionMatch[1];
          const functionParameters = functionMatch[2];
          const functionBody = functionMatch[3];
          functions[functionName] = new Function(functionParameters, functionBody);
        }
  }
  extractGlobalScopeClasses(classes, scriptContent){
      const className = classMatch[1];
      const classBody = classMatch[2];

      // Define a new class constructor
      class [className] {
        constructor() {
          // Extract and define constructor arguments
          const constructorRegex = /constructor\s*\((.*?)\)\s*\{(.*?)\}(?:;|$)/gm;
          const constructorMatch = constructorRegex.exec(classBody);
          if (constructorMatch) {
            const constructorParameters = constructorMatch[1];
            const constructorBody = constructorMatch[2];
            // Convert constructor parameters to an actual array
            const argsArray = constructorParameters.split(",").map(p => p.trim());
            // Evaluate the constructor body with the extracted parameters
            eval(`this.constructor = new Function(${argsArray}, "${constructorBody}").bind(this)`);
          }
        }
      }

      // Extract and define class methods
      const methodRegex = /([a-zA-Z0-9_$]+)\s*\((.*?)\)\s*\{(.*?)\}(?:;|$)/gm;
      let methodMatch;
      while ((methodMatch = methodRegex.exec(classBody))) {
        const methodName = methodMatch[1];
        const methodParameters = methodMatch[2];
        const methodBody = methodMatch[3];
        // Convert method parameters to an actual array
        const argsArray = methodParameters.split(",").map(p => p.trim());
        // Define the method using a function constructor
        classes[className][methodName] = new Function(argsArray, methodBody).bind(this);
      }

      classes[className].prototype = Object.create(Object.prototype);
  }
}
