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
        .then(this.parseAPPS)
        .catch(error => console.error('Error importing HTML file:', filePath));
  }
  async useAPP(appName){
    
  }
  useGenericUI(){
    
  }
  useCustomUI(){
    
  }
  parseAPPS(webAppLink){
    const url = webAppLink;
    const fileName = filePath.slice().split('/').pop();
    const html = data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body.cloneNode(true);
    console.log("imported ", filePath);
    console.log(html);
    const AppName = fileName.split(".").slice().shift();
    const templateTags = doc.querySelectorAll('body');
    const scriptTags = doc.querySelectorAll('script');
    const styleTags = doc.querySelectorAll('style');
    const css = styleTags;
    const javascript = scriptTags;
    templateTags.forEach((templateTag, index)=>{
      console.log(`Script ${index + 1}:`);
      console.log(templateTag.textContent); // Extract the html code      
    });
    styleTags.forEach((styleTag, index)=>{
      console.log(`Script ${index + 1}:`);
      console.log(styleTag.textContent); // Extract the style code      
    });
    scriptTags.forEach((scriptTag, index) => {
      console.log(`Script ${index + 1}:`);
      console.log(scriptTag.textContent); // Extract the JavaScript code
    });
    console.log("AppName", AppName);
    Apps[AppName] = function(){                        
      return new class _ {
        peerID = 0;  // needs to generated
        html = html;
        css = css;
        javascript = javascript;
        constructor(){
          
        }
        renderGenericUI(){
          console.error("renderGenericUI unprogrammed");
        }
        renderCustomUI(){
          console.error("renderCustomUI unprogrammed");
        }
        update(){
          console.error("update unprogrammed");
        }
      }
    }
  }
}
