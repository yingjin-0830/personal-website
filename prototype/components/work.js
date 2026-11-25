const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const copy = {
  en: {
    navigation: 'Work sections',
    intro: 'Sales, marketing and business operations in New York real estate. A background in quantitative management, and a practical approach to making data useful.',
    experience: 'Experience', projects: 'Projects', skills: 'Skills', education: 'Education',
    role: 'Role', companyWebsite: 'Company website', projectLabel: 'Academic project',
    projectDetail: 'Explore project', projectDetailLabel: 'Explore project',
    analytics: 'Commercial analytics', data: 'Data & tools', operations: 'Business operations',
    educationAlt: "Fashion illustration of Ying in master's graduation attire",
    bullets: {
      sunlight: [
        'Rebuilt sales tracking across 6 development projects and nearly 1,000 units, with dynamic dashboards for deal pipelines, unit counts and sales values.',
        'Connect broker and sales updates with research into competitors’ pricing, inventory and positioning to inform commercial decisions.',
        'Use AI-assisted workflows for recurring research and document extraction, while coordinating offering plans, construction draws and purchasing across teams.'
      ],
      kuaishou: [
        'Produced 9 weekly reports covering 65+ automotive brands, supporting 20% GMV growth and approximately $5M+ in incremental revenue.',
        'Combined platform datasets to shape merchant tools and incentives, contributing to 50%+ EV-brand GMV growth during the “618” shopping event.',
        'Automated an XGBoost merchant-rating model with 90%+ accuracy. Cut the reporting workflow from 4 hours to 2 hours.'
      ],
      deloitte: [
        'Analyzed retail web-portal and marketing-system data in SQL, producing 4 reports to guide product fixes and rollout decisions.',
        'Designed and executed 50+ user acceptance testing scenarios.',
        'Contributed to 20% fewer reported issues and an estimated 15% increase in user retention.'
      ],
      accenture: [
        'Built a SQL Server ETL pipeline processing 1.5M+ records, saving approximately 10 hours of manual work each week.',
        'Created 4+ Tableau dashboards and led a team of 6 in presenting findings to project leadership.'
      ]
    }
  },
  zh: {
    navigation: '职业篇章导航',
    intro: '在纽约房地产开发领域，连接销售、市场与业务运营。以量化管理为基础，让数据成为解决实际问题的方法。',
    experience: '工作经历', projects: '项目', skills: '技能', education: '教育',
    role: '职位', companyWebsite: '公司官网', projectLabel: '学术项目',
    projectDetail: '了解项目', projectDetailLabel: '了解项目',
    analytics: '商业分析', data: '数据与工具', operations: '业务运营',
    educationAlt: '穿着硕士毕业礼服的 Ying 时装插画',
    bullets: {
      sunlight: [
        '重建覆盖 6 个开发项目、近 1,000 套房源的销售追踪系统，以动态仪表盘呈现交易管线、房源数量与销售金额。',
        '结合经纪人与销售更新，研究竞品定价、库存及市场定位，为商业决策提供依据。',
        '通过 AI 辅助流程开展定期研究与文档提取，并协调发售计划、工程提款及跨团队采购事项。'
      ],
      kuaishou: [
        '产出 9 份周度行业报告，覆盖 65+ 汽车品牌，支持 20% GMV 增长及约 $5M+ 的增量收入。',
        '整合平台数据，支持商家工具及激励建议，推动“618”期间电动车品牌 GMV 增长 50%+。',
        '自动化构建准确率达 90%+ 的 XGBoost 商家评级模型，将报告流程从 4 小时缩短至 2 小时。'
      ],
      deloitte: [
        '使用 SQL 分析零售客户的门户与营销系统数据，撰写 4 份报告，为产品修复和上线决策提供依据。',
        '设计并执行 50+ 用户验收测试场景。',
        '支持问题反馈减少 20%，用户留存率预计提升 15%。'
      ],
      accenture: [
        '搭建处理 1.5M+ 条记录的 SQL Server ETL 管线，每周节省约 10 小时人工工作。',
        '构建 4+ 个 Tableau 仪表盘，并带领 6 人团队向项目管理层汇报分析发现。'
      ]
    }
  }
};

function sectionHeading(id, index, title) {
  return `<header class="work-section-heading"><span class="kicker section-index" aria-hidden="true">${index}</span><h2 class="section-title" id="${id}-title">${escapeHTML(title)}</h2></header>`;
}

// Source records stay separate from the shorter timeline presentation.
export function renderWork(language = 'en') {
  const locale = language === 'zh' ? 'zh' : 'en';
  const text = copy[locale];
  const { experiences, skills } = window.YingContent;
  const localize = value => window.YingI18n.localize(value, locale);
  const sectionNames = ['experience', 'projects', 'skills', 'education'];
  const nav = sectionNames.map(id => `<a href="#work/${id}" data-section-link="${id}">${escapeHTML(text[id])}</a>`).join('');

  const roles = ['sunlight', 'kuaishou', 'deloitte', 'accenture'].map(id => {
    const job = localize(experiences[id]);
    const website = experiences[id].website;
    return `<article class="work-role focus-item" id="${id === 'sunlight' ? 'real-estate' : id}">
      <div class="role-date"><p>${escapeHTML(job.dates)}</p><span>${escapeHTML(job.location)}</span></div>
      <div class="role-content">
        <header class="role-heading"${id === 'sunlight' ? ' id="sales-marketing"' : ''}>
          <p class="role-company">${escapeHTML(job.organization)}</p>
          <h3>${escapeHTML(job.title)}</h3>
        </header>
        <ul class="role-results">${text.bullets[id].map(bullet => `<li>${escapeHTML(bullet)}</li>`).join('')}</ul>
        ${website ? `<a class="work-source-link" href="${escapeHTML(website)}" target="_blank" rel="noopener noreferrer">${escapeHTML(text.companyWebsite)}<span aria-hidden="true"> ↗</span></a>` : ''}
      </div>
    </article>`;
  }).join('');

  const projects = ['household', 'vision', 'horses', 'walmart'].map((id, index) => {
    const project = localize(experiences[id]);
    return `<article class="work-project focus-item">
      <span class="kicker project-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      <div class="project-content"><p class="kicker">${escapeHTML(project.organization)}</p><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.lead)}</p><ul class="skill-tags" aria-label="${escapeHTML(text.skills)}">${project.chips.map(chip => `<li>${escapeHTML(chip)}</li>`).join('')}</ul></div>
      <button class="work-project-link" data-experience="${id}" aria-label="${escapeHTML(`${text.projectDetailLabel} ${project.title}`)}">${escapeHTML(text.projectDetail)}<span aria-hidden="true"> ↗</span></button>
    </article>`;
  }).join('');

  const groups = ['analytics', 'data', 'operations'].map(id => `<div class="work-skill-group focus-item"><h3>${escapeHTML(text[id])}</h3><ul class="skill-tags">${skills[id].map(skill => `<li>${escapeHTML(window.YingI18n.translate(skill, locale))}</li>`).join('')}</ul></div>`).join('');

  const education = ['duke', 'uibe'].map(id => {
    const school = localize(experiences[id]);
    return `<article class="work-school focus-item" id="${id}"><p class="kicker">${escapeHTML(school.dates)}</p><h3>${escapeHTML(school.organization)}</h3><p class="school-degree">${escapeHTML(school.title)}</p><p class="school-description">${escapeHTML(school.lead)}</p><p class="school-location">${escapeHTML(school.location)}</p></article>`;
  }).join('');

  return `<div class="work-page">
    <p class="work-intro">${escapeHTML(text.intro)}</p>
    <nav class="work-index" aria-label="${escapeHTML(text.navigation)}">${nav}</nav>
    <section class="work-section" id="experience" aria-labelledby="experience-title">${sectionHeading('experience', '01', text.experience)}<div class="work-timeline focus-group">${roles}</div></section>
    <section class="work-section" id="projects" aria-labelledby="projects-title">${sectionHeading('projects', '02', text.projects)}<div class="work-projects focus-group">${projects}</div></section>
    <section class="work-section" id="skills" aria-labelledby="skills-title"><span id="data-analytics" class="section-anchor" aria-hidden="true"></span>${sectionHeading('skills', '03', text.skills)}<div class="work-skills focus-group">${groups}</div></section>
    <section class="work-section" id="education" aria-labelledby="education-title">${sectionHeading('education', '04', text.education)}<div class="work-education-layout"><div class="work-education focus-group">${education}</div><figure class="work-education-illustration"><div class="work-education-scene"><img src="assets/illustrations/cover-approved/education_full.webp" alt="" width="1024" height="1536" loading="lazy" decoding="async"></div><img class="work-education-cut" src="assets/illustrations/cover-approved/education_cut.webp" alt="${escapeHTML(text.educationAlt)}" width="1024" height="1536" loading="lazy" decoding="async"></figure></div></section>
  </div>`;
}
