export function getCurrentTasks(data, selectedMonth, selectedYear) {

  return data.map(d => d.dateAt && new Date(d.dateAt).getMonth() === selectedMonth && new Date(d.dateAt).getFullYear() === selectedYear && { ...d }).filter(d => d);
}

export function renderHtml({ rows, columns, dateAt }) {

  const html = `
    <html>
    <head>
      <style>
        html,body{
          font:1.2em normal Arial,sans-serif;
          color:#34495E;
          width: 700px;
  
        }
        
        h1{
          text-align:center;
          text-transform:uppercase;
          letter-spacing:-2px;
          font-size:2.5em;
          margin:10px 0;
        }
        
        #container{
          width:90%;
          margin:auto;
        }
        
        table{
          border-collapse:collapse;
          width:100%;
        }
        
        table.normal{
            border:2px solid #1ABC9C;
        }
        
        thead{
          background:#1ABC9C;
          color:white;
        }
        
        th,td{
          text-align:center;
          padding:5px 0;
        }
        
        tbody tr:nth-child(even){
          background:#ECF0F1;
        }
        
        tbody tr:hover{
        background:#BDC3C7;
          color:#FFFFFF;
        }
  
      </style>
    </head>
    <body>
  
      <h1>${'Список задач за ' + dateAt + ':'}</h1>
      <div id="container">
      <table class="normal">
        <thead>
          <tr>
            ${columns.map( d => `<th>${d.title}</th>` ).join('')}
          </tr>
        </thead>
        <tbody>
        
          ${rows.map(d => {
    return `
              <tr> 
                ${columns.map( c => `<td>${d[c.dataKey] || '-'}</td>` ).join('')}
              </tr>
            `
  }).join('') }   
        
        </tbody>
      </table>
      </div>
  
    </table>
    </body>
    </html>`;

  return html;
}

export function textToHtml(element) {
  var $frame, $hiddendiv, framename, visuallyhidden;
  framename = "jsPDFhtmlText" + Date.now().toString() + (Math.random() * 1000).toFixed(0);
  visuallyhidden = "position: absolute !important;";
  $hiddendiv = document.createElement('div');
  $hiddendiv.style.cssText = visuallyhidden;
  $hiddendiv.innerHTML = "<iframe style=\"height:1px;width:1px\" name=\"" + framename + "\" />";
  document.body.appendChild($hiddendiv);

  $frame = window.frames[framename];
  $frame.document.open();
  $frame.document.writeln(element);
  $frame.document.close();

  return $frame.document.body;
}
