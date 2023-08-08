type TBoilerplateHelperProps = {
  title: string,
  content: string
}

export const boilerplate = ({ title, content }: TBoilerplateHelperProps) => (
  `<!DOCTYPE html>
   <html>
     <head>
      <title>${title}</title>
      <style>   
      /*
      hboxBackground: #151f31;
      hboxBorder: #979697;
      textBlue: #01dddf;
      textWhite: #ffffff;
      textGray: #7f7f7f;
      textGold: #cccc7f;
      textGreen: #00e500;
      globalBackground: #12223a;
      globalBorder: #89898a;
    */
    @font-face {
      font-family: "Trajan Pro";
      src: url("/static/fonts/TrajanPro.ttf");
    }
    
    * {
      border: 0;
      outline: 0;
    
      margin: 0;
      padding: 0;
    
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    
      font-family: Arial, Helvetica, sans-serif;
    
      line-height: normal;
    }
    
    body {
      background-color:#12223a;
    
      color:#ffffff;
    }
    .container {
      display: block;
    }
      </style>
     </head>
     <body>
      <div class="container">
        ${content}
      </div>
     </body>
   </html>
  `
);