(() => {
  // 建站时间 - 可以从配置中读取，这里直接写死或后续优化
  const startTime = new Date('2023-03-28 00:00:00').getTime();
  
  // 创建显示元素并插入到页脚
  function createRuntimeElement() {
    // 查找页脚中合适的位置插入
    const footerLinks = document.querySelector('.footer-links');
    if (!footerLinks) return null;
    
    // 检查是否已经添加过
    if (document.getElementById('site-runtime')) return null;
    
    const runtimeSpan = document.createElement('span');
    runtimeSpan.id = 'site-runtime';
    runtimeSpan.style.marginLeft = '8px';
    
    // 在 copyright 信息后面添加
    const copyright = footerLinks.querySelector('.copyright');
    if (copyright) {
      copyright.appendChild(runtimeSpan);
    } else {
      footerLinks.appendChild(runtimeSpan);
    }
    
    return runtimeSpan;
  }
  
  // 更新时间显示
  function updateRuntime() {
    const el = document.getElementById('site-runtime') || createRuntimeElement();
    if (!el) return;
    
    const now = new Date().getTime();
    const diff = now - startTime;
    
    // 计算天、时、分、秒
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // 补零
    const pad = (n) => String(n).padStart(2, '0');
    
    el.innerHTML = ` | 本站已运行 ${days}天 ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  
  // 初始化
  function init() {
    updateRuntime();
    setInterval(updateRuntime, 1000);
  }
  
  // 支持Pjax页面切换
  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('pjax:complete', init);
})();