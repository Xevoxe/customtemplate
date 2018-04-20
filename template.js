function template(str, delims) {
  // Fill this in
  var reGex = /\*\(([\s\S]+?)\)\*/g;
  if(delims){
    reGex = new RegExp(delims.open + '([\\s\\S]+?)'+ delims.close);

  }

  var index = 0;
  var source = 'var string = ';
  var args ="";

  str.replace(reGex, function(match, parm, offset){

    if(index > 0) 
      source += " + ";
    
    source += '"'+str.slice(index,offset)+'" + ';
    parm = parm.replace(/\s+/g, "");
    source += parm;
    args += parm + ',';
    index = offset + match.length;
  });
  args += 'repeat';
  if(index === 0) {
    source += '"' + str +'"';
  }
  source += ';\n';
  source += 'while(repeat--){ console.log(string);}\n';
  source += 'return string;';
  //source = '"' + functionString + '"' + source + '"' +')"';

  return new Function(args,source);
}