<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml">

<xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

<xsl:template match="/">
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
    <title><xsl:value-of select="/rss/channel/title"/> · 订阅文章</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        background: #f7f9fc;
        color: #1e2a3a;
        line-height: 1.5;
        padding: 2rem 1rem;
      }
      .container {
        max-width: 900px;
        margin: 0 auto;
      }
      /* 头部信息 */
      .site-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 28px;
        padding: 2rem;
        margin-bottom: 2rem;
        color: white;
        box-shadow: 0 12px 24px -12px rgba(0,0,0,0.2);
      }
      .site-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        letter-spacing: -0.01em;
      }
      .site-sub {
        font-size: 1rem;
        opacity: 0.9;
        margin-top: 0.5rem;
      }
      .site-meta {
        display: flex;
        gap: 1.5rem;
        margin-top: 1rem;
        font-size: 0.9rem;
        flex-wrap: wrap;
      }
      .site-meta a {
        color: #fff;
        text-decoration: none;
        border-bottom: 1px dotted rgba(255,255,255,0.5);
      }
      /* 文章列表 */
      .entry-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .entry-card {
        background: white;
        border-radius: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: all 0.2s ease;
        overflow: hidden;
      }
      .entry-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px -12px rgba(0,0,0,0.15);
      }
      .entry-inner {
        padding: 1.8rem;
      }
      .entry-title {
        font-size: 1.6rem;
        margin: 0 0 0.5rem 0;
        line-height: 1.3;
      }
      .entry-title a {
        color: #1e2a3a;
        text-decoration: none;
        transition: color 0.2s;
      }
      .entry-title a:hover {
        color: #667eea;
        text-decoration: underline;
      }
      .entry-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        font-size: 0.85rem;
        color: #5c6b7a;
        margin-bottom: 1rem;
        border-bottom: 1px solid #eef2f6;
        padding-bottom: 0.8rem;
      }
      .entry-date {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
      }
      .entry-date::before {
        content: "📅";
        font-size: 0.9rem;
      }
      .entry-cats, .entry-tags {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        flex-wrap: wrap;
      }
      .entry-cats::before {
        content: "📂";
      }
      .entry-tags::before {
        content: "🏷️";
      }
      .category, .tag {
        background: #eef2ff;
        padding: 0.2rem 0.6rem;
        border-radius: 20px;
        font-size: 0.75rem;
        color: #4f46e5;
      }
      .entry-summary {
        color: #2d3e50;
        margin: 0.8rem 0;
        line-height: 1.6;
        font-size: 0.98rem;
      }
      .entry-summary p {
        margin: 0.5rem 0;
      }
      .read-more {
        display: inline-block;
        margin-top: 0.8rem;
        background: #f0f2f5;
        padding: 0.4rem 1rem;
        border-radius: 30px;
        font-size: 0.85rem;
        color: #4f46e5;
        text-decoration: none;
        transition: background 0.2s;
      }
      .read-more:hover {
        background: #e4e7ef;
      }
      /* 页脚 */
      .footer {
        margin-top: 3rem;
        text-align: center;
        font-size: 0.8rem;
        color: #6c7a89;
        border-top: 1px solid #e2e8f0;
        padding-top: 2rem;
      }
      @media (max-width: 640px) {
        .entry-inner { padding: 1.2rem; }
        .entry-title { font-size: 1.3rem; }
        .site-header { padding: 1.5rem; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- 站点信息 -->
      <div class="site-header">
        <div class="site-title">
          <xsl:value-of select="/rss/channel/title"/>
        </div>
        <div class="site-sub">
          <xsl:value-of select="/rss/channel/description"/>
        </div>
        <div class="site-meta">
          <!-- 友情提示：RSS 2.0 标准中自链接元素不统一，故此处不自动生成 -->
          <span>📝 文章总数：<xsl:value-of select="count(/rss/channel/item)"/></span>
          <span>🕒 最后更新：
            <xsl:value-of select="/rss/channel/lastBuildDate"/>
          </span>
          <span>📡 订阅地址：
            <a href="{/rss/channel/link}">返回博客首页</a>
          </span>
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="entry-list">
        <xsl:for-each select="/rss/channel/item">
          <div class="entry-card">
            <div class="entry-inner">
              <h2 class="entry-title">
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h2>
              <div class="entry-meta">
                <span class="entry-date">
                  <xsl:value-of select="pubDate"/>
                </span>
                <!-- 分类（如果有），RSS 2.0 标准分类在 &lt;category&gt; 中 -->
                <xsl:if test="category">
                  <span class="entry-cats">
                    <xsl:for-each select="category">
                      <span class="category">
                        <xsl:value-of select="."/>
                      </span>
                    </xsl:for-each>
                  </span>
                </xsl:if>
              </div>
              <div class="entry-summary">
                <!-- 显示摘要，优先使用 description -->
                <xsl:choose>
                  <xsl:when test="description">
                    <xsl:value-of select="description" disable-output-escaping="yes"/>
                  </xsl:when>
                  <xsl:otherwise>
                    暂无摘要。
                  </xsl:otherwise>
                </xsl:choose>
              </div>
              <a class="read-more">
                <xsl:attribute name="href">
                  <xsl:value-of select="link"/>
                </xsl:attribute>
                阅读全文 →
              </a>
            </div>
          </div>
        </xsl:for-each>
      </div>

      <div class="footer">
        <p>© 挽着红月缓缓走 · 
        <a href="/">返回博客首页</a> · 
        订阅 <a href="{/rss/channel/link}/rss.xml">XML 源文件</a></p>
        <p style="margin-top: 0.5rem;">基于 XSLT 技术生成，样式灵感源于您博客的设计风格。</p>
      </div>
    </div>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>