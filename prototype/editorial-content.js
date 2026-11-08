(()=>{
const experiences = {
  sunlight: { title: 'Sunlight Development', kicker: 'WORK / NEW YORK', lead: 'From data to decisions.', chips: ['Work experience', 'Data analysis', '待核实'], overview: 'LinkedIn 的公开搜索索引显示了 Sunlight Development 这段经历。完整的职位名称、起止日期和职责尚未获取，因此这里先用来演示详情展开方式。', approach: ['你的角色和职责', '最有代表性的工作挑战', '使用的方法、工具和协作过程'], outcome: '下一版加入 2–3 条具体成果，以及适合公开展示的截图或作品。' },
  household: { title: 'Behind the household', kicker: 'PROJECT / ECONOMETRIC MODELING', lead: 'Understanding how the role of a housewife relates to household income.', chips: ['R', 'Econometrics', 'Causal inference'], overview: 'LinkedIn 项目摘要提到：探索家庭收入与家庭内外因素的关系，并比较多种计量经济模型。', approach: ['Exploratory data analysis', 'Matching, OLS and regression adjustment', 'Instrumental variables and simultaneous systems'], outcome: '这里将展示研究结论、你独立完成的部分与图表。公开索引中的数字和项目措辞会在你确认后再采用。' },
  vision: { title: 'A fresh perspective', kicker: 'PROJECT / MACHINE LEARNING', lead: 'Comparing image classification models for vegetable recognition.', chips: ['Python', 'Computer vision', 'MLP', 'CNN', 'VGG16', 'ResNet'], overview: 'LinkedIn 项目摘要列出了 MLP、卷积神经网络、VGG16 和 ResNet 等模型，并提到商业应用与风险分析。', approach: ['Prepare and explore an image dataset', 'Compare classification models', 'Evaluate performance and practical applications'], outcome: '项目详情最终可包含模型对比图、误分类样例与代码链接。准确率、数据划分和评估方法待核实。' },
  horses: { title: 'Better data. Better care.', kicker: 'PROJECT / R + TABLEAU', lead: 'Using health data to inform treatment decisions.', chips: ['R', 'Tableau', 'Classification', 'Risk analysis'], overview: 'LinkedIn 项目摘要提到：分析马匹健康与死亡记录，制作 Tableau 仪表盘，并比较多种预测模型。', approach: ['Exploratory analysis and visualization', 'Logistic regression, random forest, CART and SVM', 'Cost-benefit and treatment strategy analysis'], outcome: '下一步确认项目目标、模型预测对象、评估指标，以及可以公开分享的可视化。' },
  duke: { title: 'Duke University', kicker: 'EDUCATION / 2023–2024', lead: 'The Fuqua School of Business', chips: ['Master of Quantitative Management', '2023–2024', '待确认'], overview: 'LinkedIn 的公开索引列出了 Duke University — The Fuqua School of Business（2023–2024），个人简介提到 Duke MQM。', approach: ['学位正式名称与方向', '与你目标岗位最相关的课程', '代表性校园项目或活动'], outcome: '本科院校和其他教育经历尚待补充。这一页先验证学士服换装和教育经历卡片。' }
};
const places = {
  seattle: { title: 'Seattle', line: 'A little piece of the Pacific Northwest.', label: 'SEATTLE / THE MAGNET COLLECTION', position: '25% 25%' },
  boston: { title: 'Boston', line: 'A city, kept in miniature.', label: 'BOSTON / THE MAGNET COLLECTION', position: '45% 27%' },
  newyork: { title: 'New York', line: 'A city with a thousand little stories.', label: 'NEW YORK / THE MAGNET COLLECTION', position: '33% 47%' },
  shenzhen: { title: 'Shenzhen', line: 'A memory, close to home.', label: 'SHENZHEN / THE MAGNET COLLECTION', position: '57% 44%' },
  chicago: { title: 'Chicago', line: 'Art, architecture, and a little keepsake.', label: 'CHICAGO / THE MAGNET COLLECTION', position: '58% 75%' },
  florida: { title: 'Florida', line: 'A little sunshine to take home.', label: 'FLORIDA / THE MAGNET COLLECTION', position: '55% 93%' }
};

window.YingContent = { experiences, places };

})();
