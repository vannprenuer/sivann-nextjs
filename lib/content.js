// Seed content mirroring the shape of data pulled from the WordPress REST API.
// Once the live API is wired up (see lib/wp.js), these functions are replaced
// by real fetch() calls to https://sivann.com/wp-json/wp/v2/... - the page
// components don't need to change, only the data source.
//
// The `content` field on posts/portfolio items below is placeholder long-form
// text standing in for full WordPress post bodies (WP's REST API returns
// `content.rendered` as HTML for a real post -- see lib/wp.js). Replace by
// simply pointing NEXT_PUBLIC_WP_API_URL at the live site; no code changes
// needed.

export const siteInfo = {
  name: 'TE Sivann',
  tagline: 'The Art of Non-ostentatious: Choose a life of action, not one of ostentation',
  role: 'Consultant & Coach on Digital · Startup · Webstigy',
  location: 'Exotic Home City of Phnom Penh',
  email: 'hallo@sivann.com',
  phone: '+855 78-783-133',
  photo: 'https://cms.sivann.com/wp-content/uploads/2024/02/Mister-Sivann-Profile-Web-1953x2560-_2024_small-size.png',
  social: {
    facebook: 'https://www.facebook.com/mister.sivann',
    twitter: 'http://twitter.com/_sivann',
    youtube: 'https://www.youtube.com/channel/UCTG49lZaikw9CD9bBvRo6Ng',
    linkedin: 'https://www.linkedin.com/in/tesivann/',
    instagram: 'http://www.instagram.com/te_sivann',
  },
};

export const about = {
  personal: [
    { label: 'Birthday', value: 'September 9' },
    { label: 'Marital', value: 'Married' },
    { label: 'Nationality', value: 'Khmer' },
  ],
  // Content only shown on the standalone /about page (mirrors the original
  // site's "About Us" page — separate from the shorter homepage bio above).
  page: {
    roles: ['Blogger', 'Content Writer', 'Consultant', 'Coach', 'Designer', 'and So Many ...'],
    quote: 'Adhere to your ideal, firmly believe your future, strongly determine your action, and passionately realize your dream. 坚持理想，坚信未来，坚强行动，坚定实现梦想。(TE Sivann)',
    cards: [
      {
        title: 'Blog Articles',
        text: 'The main purpose of reading this blog aims to help all of you to augment your general knowledge insights as a base to generating a more great idea.',
      },
      {
        title: 'Free Resources',
        text: 'To go further details in any area of knowledge or idea in my blog, you also can access to my free resources which are absolutely free for you.',
      },
      {
        title: 'Why Us',
        text: 'Yes, of course! If you need me, I will be there to help you for any kind of solution regarding to life, love, career, and being in your journey of life.',
      },
    ],
    stats: [
      { label: 'Articles', value: '200+' },
      { label: 'Subscribers', value: '1K+' },
      { label: 'Years Experience', value: '15+' },
      { label: 'Portfolios', value: '40+' },
    ],
    welcome: `Thank you so much for visiting me. Thank you for visiting my website. Nice to you see with a warming welcome!

I hope I can share more useful information, experiences, and other knowledge together with you all. It is not only interesting for you to improve yourself but also develop myself too. I am sorry if it has got something wrong with my writing and makes you feel strange about it because I am no professional and not a native of English.`,
    family: {
      heading: 'My Family Members',
      text: 'LOVE, is a kind of persistent and a kind of belief, to change your LIFE. So, please try to care and love more people around you.\n\nLife is a series of commas, not periods. It is made up of small pleasures. With each sunrise, we start anew. The best way to predict the future is to create it. At the beginning of life, it’s decided what we will be and face as it is a natural rule, happy and sad, sweet and sour, up and down, worth and worse, etc. which called natural state, and all lives are the same.',
    },
    freelance: {
      heading: 'About Freelance Projects',
      text: 'Marketing your startup in a digital way is better, finding its way the most cost effective with big impact result, it makes the business grow further.\n\nThe absolute guidance to carry out digital marketing into your business.',
      quotes: [
        "Don't keep doing the same thing over and over to expect the results, success often comes through extremely differentiate of making changes.",
        'No matter how wonderful your idea is, if you cannot make it happens, it is still a dream not your reality.',
      ],
    },
  },
  contact: [
    { label: 'Line', value: 'tesivann' },
    { label: 'Phone', value: '078-783-133' },
    { label: 'Email', value: 'hallo@sivann.com' },
  ],
  bio: "My 'first-ten-year' was instantly and over, but the next quest for another 'ten-year' of mine is just getting started. 2019, and it has taken a quarter of the time. What's my challenge there's still myself, 2020. There requires a real step up to rebuild the way I want. Create another room for my strength way to move forward for the dream. Make it, it's my reality and not just a dream.",
};

export const experience = [
  {
    heading: 'Deputy Head, Operation Department',
    company: 'Kohthmey Technology',
    location: 'PHNOM PENH',
    from: 'July 2020',
    to: 'Apr 2024',
    duration: '(3 YEARS 8 MONTHS)',
    description: `<p><strong>Digital Marketing</strong><br />
- Develop campaign strategy through digital platform both on social media and APP.<br />
- Execute the promotion campaign on distribute channel included Facebook, TikTok, and Google AdWords.<br />
- Driven user growth (organic and paid acquisition) and user journey data<br />
- Ads Optimization and budget allocation are based on the key result with performance insights</p>
<p><strong>Campaign/Event/Activities Planning &amp; Execution</strong><br />
- Develop regular and routine event/activities related to any specific functions of the APP to lead new acquisition, retention, and re-active users<br />
- Execute the campaign with online/offline integration for the enhancement of user's experiences<br />
- Maintain the engagement from users' behavior and journey map with activities participation<br />
- Contribute and to be appointed as a committee to coordinate, organize Journalism Awards (Cambodia Journalism Inspiration Awards) that initiated by MOI and made the brand impact in the media sector.</p>
<p><strong>Operation/Management (APP)</strong><br />
- Manage and allocate all resources and functions of the APP to make sure the daily operation is ongoing smoothly and effectively to serve users' interest.<br />
- Oversee the team on each function of the operation including the app debug as common users and collect feedback for optimization<br />
- Communicate and support the technical team to accelerate the growth of the APP development from one to another version update to meet users' interests and needs (Testing &gt; Learning &gt; iterate)</p>
<p><strong>Team Management and Education</strong><br />
- Develop the measurement on quarter objectives and key results of the team and breakdown to individual and by timeframe (included Agile Scrum with Jira).<br />
- Develop a training curriculum related to product thinking &amp; strategy aligning with digital media to strengthen the team competency training<br />
- Develop manual documents or guidelines of the product, any function, data tracking &amp; analysis, and training<br />
- Lead the team to proceed with all operational tasks and keep communication closely and effectively with cross-department</p>`,
  },
  {
    heading: 'Manager, Sales & Marketing',
    company: 'FORVAL CAMBODIA',
    location: 'PHNOM PENH',
    from: 'May 2011',
    to: 'March 2020',
    duration: '(8 YEARS 10 MONTHS 10 DAYS)',
    description: `<p>Mainly in charged of domestic sale for company's services and as a marketer. Then starting attending with Japanese investors as their inspection guide and consultation for investment in Cambodia,</p>
<p>Lead/manage the team to support &amp; serve customers with services as marketing research, promotion design and planning, grand opening organizing and so on.</p>
<p>Planning and Coordinating Oversea Investment Projects from Japan, incl. Pre-investment marketing research, market-testing, new business development, etc.</p>
<p>Best Practice and continue to develop my personal growth<br />
・ Doer to thinker (executor to planner and manager)<br />
・ Be able to consult and advise for investment independently<br />
・ Successful transformed me from a traditional to a digital marketer<br />
・ Contributed to 100+ successful investment &amp; business into Cambodia<br />
・ Improvement of Key clients' development &amp; CRM<br />
・ Develop my own benchmarking in sales &amp; marketing strategic plan (model/templates)</p>
<p>Total Business development and consultancy as my role as manager, sales &amp; marketing to respond to customers, incl.<br />
・ Market Research, feasibility study, Marketing, etc.<br />
・ Investment &amp; Legal Compliance<br />
・ HR Recruitment &amp; Training<br />
・ IT Products &amp; Services (Office Automation, Software, IT solutions, etc.)<br />
・ provide a whole solution and total support to meet the customers' problems and needs.</p>
<p><a href="https://sivann.com/portfolio/career/" target="_blank" rel="noopener noreferrer">View more in Portfolio</a> | <a href="https://www.linkedin.com/in/tesivann/" target="_blank" rel="noopener">LinkedIn Profile</a></p>`,
  },
  {
    heading: 'Freelance Graphic Designer | Consultant & Coach',
    company: 'Katy Studio',
    location: 'PHNOM PENH',
    from: 'Sep 2010',
    to: 'Present',
    duration: '(10+ YEARS)',
    description: `<p>I have been doing the design works as a freelance graphic designer since I was studying at the University. Most of the projects were coming from my friends who trust me and they know clear about my work in the design creativity. Later on, I see the needs in the market about the digital marketing which included all relevant even my creative design work, branding innovation, digital strategy, website strategy (UX/UI design both web base &amp; app), and especially there is the potential need for startups idea and plan for new growth business.</p>
<p>So, I have improved myself to be able to provide a good quality of services to all above area. Then I am glad and excited in the kind of creative solutions and the relevant solution works so far until now I'm still involving in it even it is more or less project I get as a freelance every month. Hopefully, I can help my friends or the people who get trouble with the design, digital, branding, and startups. Also see in <a href="https://sivann.com/katystudio/" target="_blank" rel="noopener noreferrer">Katy Studio</a>.</p>
<p><a href="http://katystudio.com" target="_blank" rel="noopener">Katy Studio</a> | <a href="https://www.behance.net/tesivann/" target="_blank" rel="noopener">Behance</a></p>`,
  },
  {
    heading: 'Various positions (Teacher, designer, typist, scribers, interpret/translator, etc.)',
    company: 'Self-employed',
    location: 'PHNOM PENH',
    from: '2004',
    to: '2010',
    duration: '(6 YEARS 1 MONTH)',
    description: `<p>2004 - 2010 Self-employed as Teacher (Languages &amp; Computer), Graphic Designer, Typist &amp; Scriber, Translate/interpreter, etc.</p>
<p>Most of the time, I worked as a part-time computer and languages Teacher of English, Chinese, and Japanese at around BakTouk (Computer, Chinese &amp; Computer), Norodom (Japanese, English), and MIS (Mekong International School, English), most of the classes were independent classes, and the most extended types over a year, and the shorten one was about 6 months.</p>`,
  },
  {
    heading: 'Self-publisher, designer, and editor of a pocket joke/story series books',
    company: 'Self-employed',
    location: 'PHNOM PENH',
    from: 'Oct 2005',
    to: 'Sep 2007',
    duration: '(2 YEARS)',
    description: `<p>2005/Oct - 2007/Sep Self-employed as self-publisher, designer, and editor of pocket joke/story series books, including Hasha, Friendup, Warm Joke, Smile, and Mekdeysneha. Now, I still kept those works refined on the website @ <a href="http://mekdeysneha.com" target="_blank" rel="noopener">mekdeysneha.com</a></p>
<p>The publication of each book was over 4,000 - 5,000 books (with 90% sold out on average) per month and distributed to some provinces, including Kanda, Kompong Cham, Battambang, etc.</p>
<p>Our Audiences mostly were primary school and middle school, students.</p>`,
  },
  {
    heading: 'Creative Contents Writer & Blogger',
    company: 'Sivann.com',
    location: 'PHNOM PENH',
    from: 'Sep 2010',
    to: 'Present',
    duration: '(9 YEARS 3 MONTHS)',
    description: `<p>In addition to reading, I am also the one who interesting in writing. With the belief that it's a kind of thought that can be optimized my mind and refreshing my idea to more productivity. So I start writing about something I have interested in, and especially in my blog website.</p>
<p>It will show you about my information and reflect you some of others part about my life and I am thinking about. However, it is just a simple thing about a simple person the same to all the people simply living all over the world that they have their own simple things and days. Then every simple moment might be so meaningful for their life and can influence you or the others. It is just a simple.</p>
<p>I hope I can share more useful information, experiences, and others knowledge together with you all. It is not only interesting you to improve yourself but also develop myself too. Visit my <a href="https://sivann.com/blog/" target="_blank" rel="noopener noreferrer">blog</a>.</p>
<p><a href="https://www.youtube.com/@mistersivann/" target="_blank" rel="noopener">YouTube</a> | <a href="https://www.facebook.com/mister.sivann" target="_blank" rel="noopener">Facebook</a> | <a href="https://www.tiktok.com/@mistersivann" target="_blank" rel="noopener">TikTok</a></p>`,
  },
  {
    heading: 'Co-organizer of the event',
    company: 'The Youth & Technology',
    location: 'PHNOM PENH',
    from: '2010',
    to: '2012',
    duration: '(3 YEARS)',
    description: `<p>Sharing idea on running and organizing the event.<br />
An instructor of using technology for study, work, etc.<br />
Technical support on design and print the offset materials such as posters, banner, backdrop, etc. and also design and update the website.</p>
<p>We plan to reform at https://www.facebook.com/youthtech.kh</p>
<p>See more at http://yit.sivann.com</p>`,
  },
];

export const education = [
  { school: 'National University of Management', degree: 'Master of Business Management', years: '2011 - 2013' },
  { school: 'Royal University of Phnom Penh', degree: 'Bachelor of Computer Science & Engineering', years: '2007 - 2011' },
  { school: 'Cambodian Mekong University', degree: 'Bachelor of English in Education, majoring in Teaching English as a Foreign Language', years: '2008 - 2012' },
  { school: 'Bak Touk High School', degree: 'General Secondary Education, Grade 7 - 12 (Graduation of Grade 12 - Bac II)', years: '2001 - 2007' },
  { school: '群馬県立前橋工業高等学校', degree: '短期留学、体験学習 (Short-term study abroad, Japan)', years: '2006 Oct - Dec' },
  { school: '公立崇正学校', degree: '专修，中文与其它专业进修班 (Chinese language studies)', years: '2001 - 2003' },
];

export const skills = [
  { label: 'STRATEGY PLAN', value: 75 },
  { label: 'LEADERSHIP', value: 80 },
  { label: 'CONSULTANCY', value: 70 },
  { label: 'MARKETING', value: 90 },
  { label: 'UX / UI', value: 60 },
  { label: 'DESIGN', value: 80 },
  { label: 'WEBSTIGY', value: 70 },
  { label: 'DIGITAL', value: 90 },
];

export const languages = [
  { label: 'Khmer', level: 'Native' },
  { label: 'English', level: 'Fluent' },
  { label: 'Chinese', level: 'Fluent' },
  { label: 'Japanese', level: 'Basic' },
];

export const quotes = [
  { text: 'Choose a life of action, not one of ostentation.', author: 'The Sayings' },
  { text: "Don't compare yourself with anyone in this world, if you do so, you're insulting yourself.", author: 'Bill Gates' },
  { text: 'Today is cruel, tomorrow will be worse, the day after tomorrow will be wonderful.', author: 'Jack Ma' },
  { text: 'Inspire is good, action is better.', author: 'Chris Guillebeau' },
];

export const portfolio = [
  {
    id: 2530,
    title: 'Product Thought Training',
    date: '2022-03-08',
    category: 'Career',
    description: 'An internal training session on product thinking, walking the team through how to frame problems, prioritize by impact, and iterate from user feedback rather than assumptions.',
    content: `<p>This session was part of an ongoing effort to build product-thinking muscle across the operations team, not just within engineering. The goal was simple: get everyone -- marketers, support, ops -- comfortable framing their day-to-day work as a series of testable hypotheses rather than fixed plans.</p><p>We walked through a few real examples from the app's own roadmap, showing how a feature request evolves once you separate the underlying user problem from the first proposed solution. The room got the most energized during the prioritization exercise, ranking a stack of real backlog items by effort versus impact.</p><p>The biggest takeaway for me personally: training like this only sticks if it is repeated in small doses tied to real decisions, not delivered once as a one-off workshop.</p>`,
  },
  {
    id: 2559,
    title: 'The Grand Opening Ceremony of Shinohara Tires',
    date: '2020-02-20',
    category: 'Career',
    description: 'Supporting the grand opening of a new Shinohara Tires location in Phnom Penh, coordinating marketing materials, guest logistics, and on-the-ground promotion.',
    content: `<p>Grand openings are one of the more chaotic but rewarding parts of business development work in Cambodia -- lots of moving pieces, short timelines, and a lot riding on a single day going smoothly.</p><p>For this opening, the work spanned everything from coordinating printed promotional material and signage to briefing the on-site team on how to handle walk-in customers during the launch rush. Seeing a project like this go from a planning spreadsheet to an actual line of customers on opening day is always satisfying.</p>`,
  },
  {
    id: 846,
    title: 'Local Markets Research 2013 - 2016',
    date: '2016-04-06',
    category: 'Career',
    description: 'Multi-year market research work across several sectors, feeding into feasibility studies for prospective investors entering the Cambodian market.',
    content: `<p>Over these few years, a recurring part of the role was building feasibility studies for companies -- mostly Japanese investors -- evaluating whether and how to enter the Cambodian market. That meant a lot of time in local markets themselves: talking to vendors, mapping competitor pricing, and understanding distribution patterns that never show up cleanly in any published report.</p><p>The research fed directly into investment recommendations, and more than once changed the shape of a client's original plan once the on-the-ground reality became clear.</p>`,
  },
  {
    id: 781,
    title: 'My Current Workplace (FORVAL CAMBODIA)',
    date: '2015-08-06',
    category: 'Career',
    description: 'A look inside the FORVAL Cambodia office and team during this period of the role.',
    content: `<p>A quick look at the day-to-day at FORVAL Cambodia during this stretch -- a small, tight-knit team supporting Japanese investment into Cambodia across sales, marketing, and client consultation.</p><p>What stood out most about this workplace was the range of work: one week could mean guiding a first-time investor through due diligence, the next organizing a grand opening event for a client who had already launched.</p>`,
  },
  {
    id: 1013,
    title: 'My Special Day - Just Married',
    date: '2015-08-05',
    category: 'Life Events',
    description: 'A personal milestone -- our wedding day.',
    content: `<p>Some milestones deserve a spot in the portfolio too. This was our wedding day, surrounded by family and friends -- one of those days that puts all the career milestones in perspective.</p>`,
  },
  {
    id: 1035,
    title: 'MBA Graduation at National University of Management',
    date: '2015-01-15',
    category: 'Education',
    description: 'Completing the Master of Business Management program at NUM.',
    content: `<p>Graduation day for the MBA program at the National University of Management, capping off a couple of years of night classes squeezed in around a full-time job. The coursework in strategy and organizational management ended up shaping a lot of how I think about team structure and decision-making today.</p>`,
  },
  {
    id: 726,
    title: 'Bon-odori Festival 2011 (Japanese Dancing Festival)',
    date: '2011-08-20',
    category: 'Activities',
    description: 'Participating in the Bon-odori traditional Japanese dance festival in Phnom Penh.',
    content: `<p>A fun cultural exchange event -- the Bon-odori festival brought traditional Japanese summer dance to Phnom Penh, part of the broader community-building work between the local Japanese business community and Cambodian friends and colleagues.</p>`,
  },
  {
    id: 862,
    title: 'Study Tour to Japan in High School 2006',
    date: '2006-11-01',
    category: 'Education',
    description: 'A short-term study and exchange trip to Japan during high school.',
    content: `<p>短期留学、体験学習 -- a short-term study and homestay experience in Japan during high school. This trip was an early spark for what later became a long working relationship with Japanese colleagues, clients, and investors throughout my career.</p>`,
  },
  {
    id: 915,
    title: 'Business Plan Competition 2012',
    date: '2012-05-10',
    category: 'Activities',
    description: 'Competing in a university-level business plan competition.',
    content: `<p>A university business plan competition where our team pitched a startup concept in front of a panel of judges -- an early, low-stakes place to practice the pitching and structured-thinking skills that came in useful many times later in actual client and investment work.</p>`,
  },
];

export const posts = [
  {
    id: 3451,
    title: "Elon Musk's Bold Vision for 2025 — Robots, AI, and the Future of Humanity",
    date: '2025-04-20',
    excerpt: 'Elon Musk, the tech visionary and billionaire known for his groundbreaking ideas, never ceases to surprise the world with his bold predictions each year.',
    category: 'Article',
    content: `<p>Elon Musk, the tech visionary and billionaire known for his groundbreaking ideas, never ceases to surprise the world with his bold predictions each year. 2025 is no exception, with a fresh round of commentary on humanoid robotics, artificial intelligence, and where he sees both technologies heading over the next decade.</p><p>What strikes me most about following Musk's predictions over the years isn't whether every timeline turns out accurate -- most don't, by his own admission -- but the underlying pattern of thinking: pick an ambitious end-state, then work backwards to what has to be true along the way.</p><p>That's a useful mental model well outside of robotics and AI too. Applied to a career, a business, or even a personal goal, the same "backwards from the ambitious end-state" thinking tends to surface a clearer, more honest plan than starting from what feels comfortable today.</p>`,
  },
  {
    id: 3459,
    title: 'The Hidden Chain That Shapes Your Life',
    date: '2025-04-10',
    excerpt: 'It All Starts in the Mind: The Hidden Chain That Shapes Your Life. We often wonder, "Why does life turn out the way it does?"',
    category: 'Self-Improvement',
    content: `<p>It All Starts in the Mind: The Hidden Chain That Shapes Your Life. We often wonder, "Why does life turn out the way it does?" The honest answer, more often than not, traces back to a long, quiet chain: thought shapes belief, belief shapes decision, decision shapes habit, and habit -- repeated long enough -- becomes a life.</p><p>The uncomfortable part of this chain is that it means most of what we call "circumstance" is really just the compounded result of small decisions made without much scrutiny at the time. The encouraging part is the same: because the chain starts in the mind, it can be interrupted and redirected at any link, at any point.</p><p>I don't think this is about relentless positivity. It's closer to honest inventory-taking -- noticing which small daily thoughts and decisions are quietly compounding in a direction you didn't consciously choose.</p>`,
  },
  {
    id: 3350,
    title: 'Fostering Effective Communication and Expectations in the Workplace',
    date: '2023-11-20',
    excerpt: 'Effective communication and clear expectations are vital for fostering a productive and harmonious work environment.',
    category: 'Management',
    content: `<p>Effective communication and clear expectations are vital for fostering a productive and harmonious work environment. In practice, most workplace friction I've seen over the years doesn't come from bad intentions -- it comes from mismatched, unstated expectations that nobody bothered to make explicit.</p><p>A simple habit that has paid off repeatedly: at the start of any new task or project, spend five extra minutes stating out loud what "done well" looks like, and what "done on time" means in concrete terms. It feels redundant in the moment. It almost never is.</p>`,
  },
  {
    id: 3341,
    title: 'The Interconnectedness of the 4Ps and How Channels Influence Products and Pricing',
    date: '2023-11-18',
    excerpt: 'In the ever-evolving world of marketing, the 4Ps have long been recognized as the fundamental elements of a successful marketing strategy.',
    category: 'Marketing',
    content: `<p>In the ever-evolving world of marketing, the 4Ps -- Product, Price, Place, and Promotion -- have long been recognized as the fundamental elements of a successful marketing strategy. What gets less attention is how tightly interconnected they actually are in practice.</p><p>Change the distribution channel, and pricing pressure changes with it. Change the promotional channel, and the story the product needs to tell often has to change too. Treating the 4Ps as four independent levers to pull is a common mistake -- they move together, or not at all.</p>`,
  },
  {
    id: 3347,
    title: 'Understanding the Needs of Subordinates is A Key to Effective Management',
    date: '2023-11-13',
    excerpt: 'Effective leadership requires a deep understanding of the needs and aspirations of subordinates.',
    category: 'Management',
    content: `<p>Effective leadership requires a deep understanding of the needs and aspirations of subordinates -- not just their assigned tasks. It's a distinction that sounds obvious on paper and is easy to lose sight of in the middle of a busy operational week.</p><p>The managers I've learned the most from over the years shared one habit: regular, unstructured one-on-one time that wasn't just a status update, but space to actually hear what a team member needed to do their best work.</p>`,
  },
  {
    id: 3363,
    title: 'The Power of Complaints: A Pathway to Personal Growth and Organizational Change',
    date: '2023-11-12',
    excerpt: 'Complaints are often seen as negative and unproductive, but behind every complaint lies the potential for growth.',
    category: 'Self-Improvement',
    content: `<p>Complaints are often seen as negative and unproductive, but behind every complaint lies the potential for growth -- both personal and organizational. A complaint, stripped of its emotional packaging, is usually just a data point: something didn't meet an expectation.</p><p>The skill worth building, on both sides of a complaint, is separating the signal from the delivery. The delivery might be frustrated or poorly worded. The signal underneath is often exactly the feedback needed to improve.</p>`,
  },
];
