console.log("Start")
const gt=document.getElementById("get")

const img=document.getElementById("img")
const nm=document.getElementById("nm")
const rt=document.getElementById("rt")
const st=document.getElementById("st")
const amt=document.getElementById("amt")
const dat=document.getElementById("dt")
const note=document.getElementById("note")

const eimg=document.getElementById("eimg")
const enm=document.getElementById("enm")
const ert=document.getElementById("ert")
const est=document.getElementById("est")
const eamt=document.getElementById("eamt")
const edat=document.getElementById("edt")
const enote=document.getElementById("enote")

const divart=document.getElementById("art")
const divraw=document.getElementById("raw")
const divrev=document.getElementById("rev")
const divedit=document.getElementById("editor")

const revtbl=document.getElementById("revtbl")

function calc(event)
{
  console.log(event.target)
  if(rt.value!='' && st.value!='' && rt.value!=0 && st.value!=0 && event.target.id=="bamt")
  {
    amt.value=rt.value*st.value;
  }
  if(amt.value!='' && st.value!='' && amt.value!=0 && st.value!=0 && event.target.id=="brt")
  {
    rt.value=amt.value/st.value;
  }
  if(amt.value!='' && rt.value!='' && amt.value!=0 && rt.value!=0 && event.target.id=="bst")
  {
    st.value=amt.value/rt.value;
  }
}

function rawclr()
{
  img.value=null;
  nm.value='';
  rt.value=0;
  st.value=0;
  amt.value=0;
  note.value='';
}

function ck()
{
      var formdata = new FormData();
      formdata.append("key",document.getElementById("key").value)
      localStorage.pass=document.getElementById("key").value;
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      fetch("https://djapi.vercel.app/auth", requestOptions)
        .then(response => response.text())
        .then(result =>{
          console.log(result)
          if(result=='done')
            {localStorage.auth=true;
              document.getElementById("chk").style="background:green;";}
          else
            document.getElementById("chk").style="background-color:red;";
        })
        .catch(error => document.getElementById("chk").style="background-color:red;");
    return;
}

function hide()
{
  divart.style.display='None';
  divraw.style.display='None';
  divrev.style.display='None';
  divedit.style.display='None';
}

window.onload=() =>
{
  if(localStorage.auth)
    document.getElementById("auth").style="display:none";
  hide();
  dat.valueAsDate=new Date();
}

function shr()
{
  document.getElementById("status").innerHTML='';
  divart.style.display='None';
  divraw.style.display='block';
  divrev.style.display='None';
  divedit.style.display='None';
}

function sha()
{
  document.getElementById("status").innerHTML='';
  divart.style.display='block';
  divraw.style.display='None';
  divrev.style.display='None';
  divedit.style.display='None';
}

function shre()
{
  document.getElementById("status").innerHTML='';
  divart.style.display='None';
  divraw.style.display='None';
  divrev.style.display='block';
  divedit.style.display='None';
  read();
}

async function dt()
{
  if(nm.value == null || nm.value.trim() == '')
  {
    console.log("exit")
    document.getElementById("status").innerHTML='<p style="color:red">Name is missing<p>';
    return;
  }
    await comp();
    document.getElementById("status").innerHTML='<i class="fa-solid fa-spinner fa-spin" style="color: #ffff00;"></i>';
    
    var formdata = new FormData();
    var resized = document.getElementById('output').src;
    await fetch(resized)
    .then(res => res.blob())
    .then(blob => {
      try{
      formdata.append("fil", blob,img.files[0].name);}
      catch(err)
      {
        document.getElementById("status").innerHTML=document.getElementById("status").innerHTML+"<p style='color:yellow'>Uploading Without Image...</p>"
      }
    })
    // formdata.append("fil", resized,img.files[0].name);
    formdata.append("key",localStorage.pass);
    formdata.append("nm", nm.value);
    formdata.append("rt", rt.value);
    formdata.append("st", st.value);
    formdata.append("am", amt.value);
    formdata.append("dt", dat.value);
    formdata.append("note", note.value);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch("https://djapi.vercel.app/new", requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result);
        document.getElementById("status").innerHTML='<i class="fa-solid fa-check" style="color: #00ff00;"></i><p style="color:green">'+result+'</p>';
      })
      .catch(error =>{console.log('error', error);
      document.getElementById("status").innerHTML='<i class="fa-solid fa-xmark" style="color: #ff0000;"></i>';
    });
}

async function comp()
{
  var image = document.getElementById('output');

  var canvas = document.getElementById("can");
  var ctx = canvas.getContext('2d');
  if(image.naturalWidth==0 && image.naturalHeight==0)
  {
    return;
  }
  console.log(image.naturalWidth)
  console.log(image.naturalHeight)
  canvas.width=(image.naturalWidth/15)
  canvas.height=(image.naturalHeight/15)
  console.log(canvas.height)
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const dataURI = canvas.toDataURL();
  image.src=dataURI;
}

async function ecomp()
{
  var image = document.getElementById('eoutput');

  var canvas = document.getElementById("ecan");
  var ctx = canvas.getContext('2d');
  if(image.naturalWidth==0 && image.naturalHeight==0)
  {
    return;
  }
  console.log(image.naturalWidth)
  console.log(image.naturalHeight)
  canvas.width=(image.naturalWidth/15)
  canvas.height=(image.naturalHeight/15)
  console.log(canvas.height)
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const dataURI = canvas.toDataURL();
  image.src=dataURI;
}

async function read()
{document.getElementById("status").innerHTML='<i class="fa-solid fa-spinner fa-spin" style="color: #ffff00;"></i>';
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  var opts="";
  await fetch("https://djapi.vercel.app/all?key="+localStorage.pass, requestOptions)
    .then(response => response.json())
    .then(result =>{
      for(var i=0;i<result.length;i++)
        {
          opts=opts+"<option>"+result[i][0]+"</option>";
        }
        document.getElementById("status").innerHTML='<i class="fa-solid fa-check" style="color: #00ff00;"></i>';
      }
      )
    .catch(error => console.log('error', error));
  document.getElementById("slist").innerHTML=opts;
  return;
}

async function srch()
{
  document.getElementById("status").innerHTML='<i class="fa-solid fa-spinner fa-spin" style="color: #ffff00;"></i>';
  var i,j;
  var tbl="<tr><th>Date</th><th>Name</th><th>Rate</th><th>Stock</th><th>Amount</th><th>note</th><th>Pic</th><th>Edit</th></tr>"
  var formdata = new FormData();
  formdata.append("id",document.getElementById("nmsr").value);
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  await fetch("https://djapi.vercel.app/all/"+document.getElementById("nmsr").value+"?key="+localStorage.pass, requestOptions)
    .then(response => response.json())
    .then(result =>{
      if(result['message']=='article not found')
      {
        document.getElementById("status").innerHTML='<i class="fa-solid fa-xmark" style="color: #ff0000;"></i>'+"<p style='color:red'>No match found</p>";
        tbl="";
        return;
      }
      for(i=0;i<result.length;i++)
      {
        tbl=tbl+"<tr>";
        for(j=0;j<result[i].length;j++)
        {
          if(j==0)
          {
            var d=new Date(result[i][j])
            tbl=tbl+"<td>"+d.toDateString()+"</td>"
          }
          else if(j==6)
          {
            tbl=tbl+"<td><i id='"+result[i][j]+"' class='fa-solid fa-image' style='color: #00ff00;' onclick='getpic(event)'></i></td>"
          }
          else if(j==7)
          {
            tbl=tbl+"<td><button id='"+result[i][j]+"'class='fa-regular fa-pen-to-square' style='color: white;' onclick='einit(event)'/></td>";
          }
          else
          tbl=tbl+"<td>"+result[i][j]+"</td>"
        }
        tbl=tbl+"</tr>";
      }
      document.getElementById("status").innerHTML='<i class="fa-solid fa-check" style="color: #00ff00;"></i>';
      })
    .catch(error =>{document.getElementById("status").innerHTML='<i class="fa-solid fa-xmark" style="color: #ff0000;"></i>';
});
  revtbl.innerHTML=tbl;
  return;
}

async function update()
{
  if(enm.value == null || enm.value.trim() == '')
  {
    console.log("exit")
    document.getElementById("status").innerHTML='<p style="color:red">Name is missing<p>';
    return;
  }
    await ecomp();
    document.getElementById("status").innerHTML='<i class="fa-solid fa-spinner fa-spin" style="color: #ffff00;"></i>';
    
    var formdata = new FormData();
    var resized = document.getElementById('eoutput').src;
    await fetch(resized)
    .then(res => res.blob())
    .then(blob => {
      try{
      formdata.append("fil", blob,eimg.files[0].name);
    }
      catch(err)
      {
        document.getElementById("status").innerHTML=document.getElementById("status").innerHTML+"<p style='color:yellow'>Updating Without Image...</p>"
      }
    })
    formdata.append("key",localStorage.pass);
    formdata.append("nm", enm.value);
    formdata.append("rt", ert.value);
    formdata.append("st", est.value);
    formdata.append("am", eamt.value);
    formdata.append("dt", edat.value);
    formdata.append("note", enote.value);
    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };
    fetch("https://djapi.vercel.app/spec/"+document.getElementById("eid").value, requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result);
        document.getElementById("status").innerHTML='<i class="fa-solid fa-check" style="color: #00ff00;"></i><p style="color:green">'+result+'</p>';
        revtbl.innerHTML="";
      })
      .catch(error =>{console.log('error', error);
      document.getElementById("status").innerHTML='<i class="fa-solid fa-xmark" style="color: #ff0000;"></i>';
    });
}

async function delt()
{document.getElementById("status").innerHTML='<i class="fa-solid fa-spinner fa-spin" style="color: #ffff00;"></i>';
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  await fetch("https://djapi.vercel.app/spec/"+document.getElementById("eid").value+"?key="+localStorage.pass, requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result);
      document.getElementById("status").innerHTML='<i class="fa-solid fa-check" style="color: #00ff00;"></i><p style="color:green">'+result+'</p>';
      revtbl.innerHTML="";
    })
    .catch(error =>{console.log('error', error);
    document.getElementById("status").innerHTML='<i class="fa-solid fa-xmark" style="color: #ff0000;"></i>';
  });
}

gt.addEventListener('click',dt)
document.getElementById("butf").addEventListener('click',sha)
document.getElementById("butr").addEventListener('click',shr)
document.getElementById("butg").addEventListener('click',shre)
document.getElementById("sr").addEventListener('click',srch)
document.getElementById("bst").addEventListener('click',calc)
document.getElementById("brt").addEventListener('click',calc)
document.getElementById("bamt").addEventListener('click',calc)
document.getElementById("ebut").addEventListener('click',update)
document.getElementById("delete").addEventListener('click',delt)
document.getElementById("chk").addEventListener('click',ck)
document.getElementById("clrd").addEventListener('click',rawclr)