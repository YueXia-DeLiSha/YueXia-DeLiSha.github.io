(() => {
  const startTime = new Date('2023-03-28 00:00:00').getTime();
  
  // 等待DOM完全加载
  function init() {
    // 避免重复创建
    if (document.getElementById('site-runtime')) {
      updateRuntime();
      return;
    }

    // 尝试找到包含特定文字的链接元素作为插入位置
    const links = document.querySelectorAll('footer a, .footer a, .site-footer a, .copyright a');
    let targetElement = null;
    
    // 按文字内容查找
    for (let link of links) {
      if (link.textContent.includes('可以分享文章') || link.textContent.includes('赞赏支持')) {
        targetElement = link;
        break;
      }
    }
    
    // 如果没找到，尝试其他常见页脚元素
    if (!targetElement) {
      const footer = document.querySelector('footer');
      if (footer) {
        // 查找最后一个链接
        const allFooterLinks = footer.querySelectorAll('a');
        targetElement = allFooterLinks[allFooterLinks.length - 1];
      }
    }
    
    if (!targetElement) {
      console.warn('未找到合适的插入位置，将在5秒后重试');
      setTimeout(init, 5000);
      return;
    }

    // 创建计时器容器
    const runtimeDiv = document.createElement('div');
    runtimeDiv.id = 'site-runtime';
    runtimeDiv.style.display = 'block'; // 确保换行
    runtimeDiv.style.marginTop = '8px';
    runtimeDiv.style.fontSize = '0.9em';
    runtimeDiv.style.opacity = '0.8';
    
    // 插入到目标元素后面（如果是链接，插入到其父元素内之后）
    if (targetElement.parentNode) {
      targetElement.parentNode.insertBefore(runtimeDiv, targetElement.nextSibling);
    } else {
      targetElement.after(runtimeDiv);
    }

    // 如果已经存在计时器则先清除
    if (window._runtimeInterval) clearInterval(window._runtimeInterval);
    
    // 立即更新一次
    updateRuntime();
    
    // 每秒更新
    window._runtimeInterval = setInterval(updateRuntime, 1000);
  }
  
  function updateRuntime() {
    const el = document.getElementById('site-runtime');
    if (!el) return;
    
    const diff = Date.now() - startTime;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const pad = (n) => String(n).padStart(2, '0');
    
    el.textContent = `本站已运行 ${days}天 ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  
  // 监听页面事件
  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('pjax:complete', init);
  
  // 如果DOM已就绪
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 100);
  }
})();