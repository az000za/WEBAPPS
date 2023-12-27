class WEBAPPS {
  APPS = {};
  webAppLinks = [];
  constructor(webAppLinks){}
  async fetchAPPS(webAppLinks){
      this.webAppLinks = webAppLinks;
      for (const url of webAppLinks) {
        await this.fetchApp(url);
      }
      return this;
  }
  async fetchApp(url){
    // console.log(`fetching url: `,url);
    fetch(url, {
          mode: "no-cors"
        })
        .then(response => response.text())
        .then(data => { this.parseHTMLAPP(url, data); })
        .catch(error => console.error('Error importing HTML file:'+url+"..."+error));
  }
  useAPP(AppName){
    return new Promise((resolve, reject) => {
      let checkExist = setInterval(() => {
        if (this.APPS.hasOwnProperty(AppName)) {
          clearInterval(checkExist);
          resolve(this.APPS[AppName]);
        }
      }, 10); // check every 10ms
    });
  }
  parseHTMLAPP(url, data){
    const fileName = url.split('/').pop(); // Changed the order of methods to split the URL
    const _html_ = data;
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(_html_, 'text/html');
    const body = htmlDoc.body.cloneNode(true); // Changed 'doc' to 'htmlDoc'
    const AppName = fileName.split(".").shift(); // Changed 'slice()' to 'shift()'
    const html = this.parseHTML(htmlDoc); 
    const css = this.parseCSS(htmlDoc); 
    const javascript = this.parseJavaScript(htmlDoc);
    this.setAPP({AppName, html, css, javascript});
  }
  setAPP({AppName, html, css, javascript}){
    this.APPS[AppName] = function(){                        
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
      // console.log(`Script ${index + 1}:`);
      // console.log(templateTag.textContent); // Extract the html code      
    });
    return templateTags;
  }
  parseCSS(htmlDoc){
      const styleTags = htmlDoc.querySelectorAll('style');
      styleTags.forEach((styleTag, index)=>{
        // console.log(`Script ${index + 1}:`);
        // console.log(styleTag.textContent); // Extract the style code      
      });
      return styleTags;
  }
  parseJavaScript(htmlDoc){
      const scriptTags = htmlDoc.querySelectorAll('script');
      // Loop through each script tag
      let globalFunctions = [];
      let globalClasses = [];
      let globalVariables = [];    
      scriptTags.forEach((scriptTag, index) => {
          const scriptContent = scriptTag.textContent;
          // console.log("script content: ");
          // console.log(scriptContent);
          globalFunctions.push(this.extractGlobalScopeFunctions(scriptContent));
          globalClasses.push(this.extractGlobalClasses(scriptContent));
          globalVariables.push(this.extractGlobalScopeVariables(scriptContent));
      });
      return {
        globalVariables,
        globalFunctions,
        globalClasses,
      };
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
  extractGlobalScopeFunctions(scriptContent) {
    let functions = {};
    const functionRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\((.*?)\)\s*\{([\s\S]*?)\}(?=\s*(?:;|\}|$))/gm;
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
