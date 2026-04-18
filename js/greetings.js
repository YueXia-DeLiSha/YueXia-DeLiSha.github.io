// 德丽莎的时辰问候 (兼容 hexo-helper-live2d 插件)
(function() {
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 9) return '✨ 早上好呀舰长，今天的世界TeriTeri也准时报道啦！';
    if (hour >= 9 && hour < 12) return '🌞 上午好舰长！要记得补充能量哦……比如，来一杯美味的苦瓜汁？';
    if (hour >= 12 && hour < 14) return '🍲 舰长，到点吃饭啦！';
    if (hour >= 14 && hour < 18) return '☕️ 下午好呀舰长，有点困了吗？不许偷懒哦，学园长在看着你呢！';
    if (hour >= 18 && hour < 22) return '🌙 晚上好舰长，忙碌了一天辛苦啦。无论何时，我都在你身边。';
    if (hour >= 22 || hour < 2) return '😴 舰长，已经很晚了哦。TeriTeri要你早点休息啦！';
    return '🌃 凌晨好呀舰长……这么晚还没睡，是在等我吗？';
  }

  function showGreeting() {
    // 检查本次会话是否已显示过问候，通过sessionStorage实现“只触发一次”
    const hasGreeted = sessionStorage.getItem('delisha_greeted');
    if (hasGreeted) return;

    // 检查核心对象是否存在
    if (window.L2Dwidget && typeof window.L2Dwidget.alert === 'function') {
      window.L2Dwidget.alert(getGreeting(), 4000);
      sessionStorage.setItem('delisha_greeted', 'true');
      return;
    }

    // 如果模型还未初始化，则等待片刻后重试
    let retryCount = 0;
    const maxRetries = 10;
    const retryInterval = setInterval(() => {
      retryCount++;
      if (window.L2Dwidget && typeof window.L2Dwidget.alert === 'function') {
        clearInterval(retryInterval);
        window.L2Dwidget.alert(getGreeting(), 4000);
        sessionStorage.setItem('delisha_greeted', 'true');
      } else if (retryCount >= maxRetries) {
        clearInterval(retryInterval);
        console.warn('⚠️ 德丽莎问候: L2Dwidget.alert 方法未找到，请检查插件是否已正确加载。');
      }
    }, 300);
  }

  // 页面加载完成后显示问候
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showGreeting);
  } else {
    showGreeting();
  }

  // 如果页面通过 Pjax 加载，重置问候状态，允许在新页面再次问候一次
  document.addEventListener('pjax:complete', function() {
    sessionStorage.removeItem('delisha_greeted');
    showGreeting();
  });
})();