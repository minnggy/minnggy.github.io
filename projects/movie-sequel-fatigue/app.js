const rows = window.MODEL_RESULTS;
const selection = [
  ['logistic_regression_v1_results.csv','Model A',null,'Logistic · A'],
  ['random_forest_v1_results.csv','Model A',null,'Random Forest · A'],
  ['model_c_continuity_results.csv','Model C','Logistic Regression','Logistic · C'],
  ['model_c_continuity_results.csv','Model C','Random Forest','Random Forest · C'],
  ['final_xgboost_results.csv','Final XGBoost Model C',null,'XGBoost · C'],
  ['logistic_regression_tuned_v1_results.csv',null,null,'Tuned Logistic · A'],
  ['random_forest_tuned_v1_results.csv',null,null,'Tuned Random Forest · A']
];
function render(strategy){
 const target=document.getElementById('results'); target.replaceChildren();
 selection.forEach(([file,model,algorithm,label])=>{
  const r=rows.find(x=>x.source_file===file && (!model||x.model===model) && (!algorithm||x.algorithm===algorithm)&& x.preprocessing===strategy);
  const tr=document.createElement('tr');if(label==='Tuned Random Forest · A')tr.className='highlight';
  [label,r?r.n:'未提供',...['roc_auc','pr_auc','brier'].map(k=>r?Number(r[k]).toFixed(4):'—')].forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.append(td)});target.append(tr);
 });
 document.getElementById('strategy-note').textContent=strategy==='P2'?'P2：僅使用訓練集學習補值、缺失指標與縮放參數。':'P1：各規格僅保留其 X 全部完整的樣本；Model C 的可用樣本不同。';
}
document.querySelectorAll('[name=strategy]').forEach(input=>input.addEventListener('change',()=>render(input.value)));render('P2');
const dialog=document.getElementById('zoom');
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{const img=document.getElementById('zoom-image');img.src=button.dataset.zoom;img.alt=button.querySelector('img').alt;dialog.showModal()}));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
