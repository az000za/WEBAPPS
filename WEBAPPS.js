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
    console.log(`fetching url: `,url);
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
    console.log("parsing url", url);
    console.log("data", data);
    const fileName = url.split('/').pop(); // Changed the order of methods to split the URL
    console.log("1");
    const _html_ = data;
    console.log("2");
    const parser = new DOMParser();
    console.log("3");
    const htmlDoc = parser.parseFromString(_html_, 'text/html');
    console.log("4");
    console.log("htmlDoc", htmlDoc);
    const body = htmlDoc.body.cloneNode(true); // Changed 'doc' to 'htmlDoc'
    console.log("body", body);
    console.log("imported ", url);
    console.log(_html_); // Changed 'html' to '_html_'
    const AppName = fileName.split(".").shift(); // Changed 'slice()' to 'shift()'
    console.log("AppName", AppName);
    console.log("5");
    // Assuming these functions are defined elsewhere in your code
    const html = this.parseHTML(htmlDoc); 
    console.log("6");
    console.log("parsed html", html);
    const css = this.parseCSS(htmlDoc); 
    console.log("7");
    console.log("parsed css", css);
    const javascript = this.parseJavaScript(htmlDoc);
    console.log("parsed javascript", javascript);
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
      console.log(`Script ${index + 1}:`);
      console.log(templateTag.textContent); // Extract the html code      
    });
    return templateTags;
  }
  parseCSS(htmlDoc){
      const styleTags = htmlDoc.querySelectorAll('style');
      styleTags.forEach((styleTag, index)=>{
        console.log(`Script ${index + 1}:`);
        console.log(styleTag.textContent); // Extract the style code      
      });
      return styleTags;
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
              this.APPS[AppName]["javascript"] = {
                  globalVariables,
                  globalFunctions,
                  globalClasses,
              };
          }
      });
    return scriptTags;
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
