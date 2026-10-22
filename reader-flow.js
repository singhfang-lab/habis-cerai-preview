// Presentation adapter: choices stay in the story engine, prose stays in the source.
(function(root){
 const engine=typeof module!=='undefined'?require('./engine.js'):root.StoryEngine;
 function blocks(s,book){return Array.from({length:s.step+1},(_,step)=>({step,lines:engine.pages({...s,step,page:0},book).flat()}));}
 function choose(s,book,key,n){const e=engine.at(s,book),expected=s.step===0?e.first:s.step===2?e.second:null;if(!expected||expected.key!==key||!expected.options[n])return false;s.page=engine.pages(s,book).length-1;if(!engine.choose(s,book,key,n))return false;s.page=engine.pages(s,book).length-1;engine.next(s,book);return true;}
 function next(s,book){if(![1,3,4].includes(s.step))return false;s.page=engine.pages(s,book).length-1;return engine.next(s,book);}
 function visibleState(s,book){return {...s,page:engine.pages(s,book).length-1};}
 const api={blocks,choose,next,visibleState};if(typeof module!=='undefined')module.exports=api;else root.ReaderFlow=api;
})(typeof globalThis!=='undefined'?globalThis:this);
