const ADMIN_PASSWORD = 'jskbti2024';

let selectedMode = 'literary';
let selectedType = 'single';
let currentQuestionIndex = 0;
let answers = {};
let isAdminLoggedIn = false;
let editingQuestionId = null;

const PERSONALITY_TYPES = {
    'A': {
        name: '邓宏锦',
        background: '你是个天生的浪漫主义者，热情是你最亮眼的标签。高共情力让你总能感知到他人的情绪，但你从不随波逐流——你有着独立的思考和判断。你包容万物，却在心里保留着一片只属于自己的天空。你随遇而安但有自己的坚持，活在当下是你的人生哲学。',
        background_simple: '你是个热情浪漫的人，高共情、独立思考、包容洒脱。你随遇而安但有自己坚持，活在当下是你的人生哲学。',
        emotion: '你相信爱，却不给爱设限。宁可高质量单身，也不愿将就。你觉得"我爱你，但我更爱我自己"——这不是冷漠，而是清醒。你对感情的态度是：认真但不执念。你重视自我价值，不会为了爱情失去自己。',
        emotion_simple: '你相信爱但不将就。宁可单身也不敷衍。感情认真但不执念，你信奉先爱自己再爱别人。你重视自我价值，不会为了爱情失去自己。',
        life: '你相信人生是场体验，不必太用力。你随遇而安，却绝非躺平——你有自己的节奏和坚持。你很少为未来过度焦虑，因为你知道，该来的都会来。活在当下，是你的人生哲学。你相信命运的安排，却也会为自己的目标努力。',
        life_simple: '你随遇而安不躺平，有自己的节奏。不为未来过度焦虑，该来的都会来，活在当下。你相信命运的安排，却也会为自己的目标努力。',
        memory: ['独立思考', '包容理解', '高共情', '随性洒脱', '清醒恋爱', '活在当下']
    },
    'B': {
        name: '金熙',
        background: '你是天生的氛围maker，真诚是你最锋利的武器。耿直、重感情、讲义气——这些老派的品质在你身上闪闪发光。你不装、不藏，有什么就说什么，这种坦荡反而让你赢得最多信任。你是朋友们的定心丸，关键时刻最靠谱。',
        background_simple: '你是真诚坦荡的人，耿直重感情讲义气。你不装不藏，坦荡赢得信任。是天生的组织者和氛围制造者，朋友们的定心丸。',
        emotion: '你相信爱情，也相信人心。即使被伤害过，你也选择继续认真。你觉得"感情这事，敷衍是最大的辜负"。你对感情的态度是：要么不开始，要么全情投入。你对待朋友同样如此，掏心掏肺，毫无保留。',
        emotion_simple: '你相信爱情，被伤害过也继续认真。感情要不不开始，要不全情投入，敷衍是最大的辜负。你对待朋友同样掏心掏肺，毫无保留。',
        life: '你是个乐天派，不是盲目乐观，而是看透生活本质后依然热爱。你信奉"船到桥头自然直"，但真到关键时刻，你比谁都靠谱。组织能力max，是朋友们的主心骨。你总是能在混乱中找到秩序，在困境中找到希望。',
        life_simple: '你乐观看透生活本质后依然热爱。关键时刻最靠谱，是朋友们的主心骨。你总是能在混乱中找到秩序，在困境中找到希望。',
        memory: ['真诚坦荡', '组织力强', '乐观担当', '全情投入', '义气为先', '主心骨']
    },
    'C': {
        name: '岳思语',
        background: '你是那种表面波澜不惊，内心暗流涌动的类型。回避不是冷漠，而是你保护自己的方式。你习惯独自消化情绪，独自承担重量——不是因为不需要陪伴，而是你不想给别人添麻烦。你嘴上说着"随便"，心里却早有计较，用行动代替言语证明自己的可靠。',
        background_simple: '你表面平静内心丰富。回避型自我保护，习惯独自消化情绪，默默承担不给人添麻烦。嘴上随便心里有数，用行动证明可靠。',
        emotion: '你害怕依赖，却比谁都渴望被理解。你嘴上说着"无所谓"，心里却记得每一个细节。回避型依恋不是你的标签，而是你还没遇到那个让你安心放下防备的人。对的人，你会愿意主动。你对待朋友也是如此，默默关心，不轻易表达。',
        emotion_simple: '你害怕依赖但渴望理解。嘴上无所谓心里记细节。没遇到对的人之前保持回避，对的人会出现。你对待朋友默默关心，不轻易表达。',
        life: '你比谁都清楚生活的重量，却依然认真对待每一天。你嘴上说着"随便"，心里却早有计较。默默承担责任、默默规划未来——你用行动代替言语，证明自己的可靠。你重视家庭，愿意为所爱的人付出一切。',
        life_simple: '你清楚生活重量但认真对待。嘴上随便心里有数，默默承担用行动证明可靠。你重视家庭，愿意为所爱的人付出一切。',
        memory: ['默默承担', '外冷内热', '细腻敏感', '回避依赖', '语出惊人', '责任感强']
    },
    'D': {
        name: '陈舒窈',
        background: '你经历过内心的风暴，因此学会了通透。你曾试图掌控一切，后来发现人生本就是无常。于是你学会了在不确定中找确定性，在疏离中找归属。你对在乎的人愿意倾尽所有，对无关的人可以冷漠到底。你矛盾却真实，自私却不凉薄。',
        background_simple: '你经历内心风暴后变得通透。想掌控一切但发现人生无常，学会了在不确定中找确定性。你对在乎的人倾尽所有，对无关的人冷漠到底。',
        emotion: '你有情感漠视，但不是没有感情——只是你的感情有优先级。对朋友，你可以倾尽所有；对无感的人，你懒得敷衍。你觉得恋爱脑是种愚蠢，但你承认自己也会为朋友冲动消费。矛盾吗？你觉得这才真实。你重视自我，不会为了任何人失去自己的边界。',
        emotion_simple: '你有情感漠视但对朋友掏心掏肺。恋爱脑觉得愚蠢，但为朋友舍得花钱。矛盾但真实。你重视自我，不会为了任何人失去自己的边界。',
        life: '你曾经很想掌控一切，后来发现放手才是最好的安排。你不规划太远的未来，只专注眼前——"该来的会来，该走的会走"。你信命，但不失斗志；你自私，但不小气。你的人生观：先过好自己，再考虑别人。你懂得在妥协中保持自我，在现实中寻找理想。',
        life_simple: '从掌控到放手。不规划太远专注眼前，信命但有斗志，自私但不小气，先过好自己。你懂得在妥协中保持自我，在现实中寻找理想。',
        memory: ['掌控放手', '情感漠视', '自私真实', '友爱慷慨', '通透矛盾', '自我边界']
    }
};

const CATEGORY_LABELS = {
    'EMOTION': '情感',
    'LIFE': '人生',
    'FRIENDSHIP': '友情',
    'MEMORY': '回忆'
};

const DEFAULT_QUESTIONS = [
    {
        id: 'q1',
        category: 'EMOTION',
        literary: { question: '当心动的种子悄然萌芽，你会如何守护这份悸动？', options: [
            { text: '将它深藏心底，任其静静生长', tendency: 'A' },
            { text: '勇敢袒露，让光照进来', tendency: 'B' },
            { text: '静待时机，让时间替你作答', tendency: 'C' },
            { text: '保持距离，怕它转瞬即逝', tendency: 'D' }
        ]},
        simple: { question: '当你喜欢一个人时，你会？', options: [
            { text: '默默喜欢，不主动表白', tendency: 'A' },
            { text: '直接表白，勇敢追求', tendency: 'B' },
            { text: '观察一段时间，再决定', tendency: 'C' },
            { text: '保持距离，害怕受伤', tendency: 'D' }
        ]}
    },
    {
        id: 'q2',
        category: 'FRIENDSHIP',
        literary: { question: '朋友生日将至，你想赠予怎样的心意？', options: [
            { text: '精心准备，给在场所有人都送上祝福', tendency: 'A' },
            { text: '张罗一场聚会，让欢乐蔓延', tendency: 'B' },
            { text: '默默记下，在心底送上问候', tendency: 'C' },
            { text: '挑选一份厚礼，以心意抵岁月', tendency: 'D' }
        ]},
        simple: { question: '朋友生日，你会？', options: [
            { text: '精心准备礼物，给所有人都买', tendency: 'A' },
            { text: '组织聚会，安排得妥妥当当', tendency: 'B' },
            { text: '默默记住，发个祝福', tendency: 'C' },
            { text: '挑个贵的礼物，不心疼钱', tendency: 'D' }
        ]}
    },
    {
        id: 'q3',
        category: 'LIFE',
        literary: { question: '当困境如潮水涌来，你如何寻找彼岸？', options: [
            { text: '随波逐流，相信船到桥头自然直', tendency: 'A' },
            { text: '迎浪而上，用智慧开辟道路', tendency: 'B' },
            { text: '独自泅渡，在沉默中积蓄力量', tendency: 'C' },
            { text: '接受潮汐，调整步伐重新出发', tendency: 'D' }
        ]},
        simple: { question: '面对困难，你会？', options: [
            { text: '随遇而安，船到桥头自然直', tendency: 'A' },
            { text: '积极面对，想办法解决', tendency: 'B' },
            { text: '独自消化，默默承受', tendency: 'C' },
            { text: '接受现实，调整心态', tendency: 'D' }
        ]}
    },
    {
        id: 'q4',
        category: 'MEMORY',
        literary: { question: '回望那段青涩岁月，何事在你心中留下最深印记？', options: [
            { text: '与好友并肩同行的时光', tendency: 'A' },
            { text: '为集体奔走的热血瞬间', tendency: 'B' },
            { text: '独自挑灯夜战的夜晚', tendency: 'C' },
            { text: '那些意想不到的成长转折', tendency: 'D' }
        ]},
        simple: { question: '学生时代最难忘的事是？', options: [
            { text: '和朋友一起的快乐时光', tendency: 'A' },
            { text: '组织班级活动的日子', tendency: 'B' },
            { text: '努力学习的日子', tendency: 'C' },
            { text: '经历重要的人生转折', tendency: 'D' }
        ]}
    },
    {
        id: 'q5',
        category: 'EMOTION',
        literary: { question: '当一段故事落下帷幕，你会如何珍藏这段记忆？', options: [
            { text: '将它收入心底，偶尔翻阅', tendency: 'A' },
            { text: '翻过这一页，向前看', tendency: 'B' },
            { text: '独自品味，不愿打扰任何人', tendency: 'C' },
            { text: '让它随风而去，无谓执念', tendency: 'D' }
        ]},
        simple: { question: '分手后，你会？', options: [
            { text: '保留联系方式，偶尔关注', tendency: 'A' },
            { text: '彻底删除，重新开始', tendency: 'B' },
            { text: '默默难过，不告诉别人', tendency: 'C' },
            { text: '无所谓，很快翻篇', tendency: 'D' }
        ]}
    },
    {
        id: 'q6',
        category: 'FRIENDSHIP',
        literary: { question: '朋友陷入泥泞，你会伸出怎样的手？', options: [
            { text: '倾听与陪伴，温柔地治愈', tendency: 'A' },
            { text: '卷起袖子，一起趟过泥泞', tendency: 'B' },
            { text: '默默守望，不惊扰这份脆弱', tendency: 'C' },
            { text: '倾尽所有，只为护你周全', tendency: 'D' }
        ]},
        simple: { question: '朋友遇到困难，你会？', options: [
            { text: '耐心倾听，给予安慰', tendency: 'A' },
            { text: '立刻行动，帮忙解决', tendency: 'B' },
            { text: '默默关心，不打扰', tendency: 'C' },
            { text: '尽我所能，不计成本', tendency: 'D' }
        ]}
    },
    {
        id: 'q7',
        category: 'LIFE',
        literary: { question: '远方的路迷雾重重，你如何踏出下一步？', options: [
            { text: '不急不躁，且走且看', tendency: 'A' },
            { text: '拨开迷雾，绘制自己的地图', tendency: 'B' },
            { text: '默默积蓄，等待云开见月明', tendency: 'C' },
            { text: '着眼当下，步步为营', tendency: 'D' }
        ]},
        simple: { question: '对未来，你更倾向于？', options: [
            { text: '随遇而安，不做过多规划', tendency: 'A' },
            { text: '积极规划，努力实现', tendency: 'B' },
            { text: '默默努力，等待机会', tendency: 'C' },
            { text: '活在当下，享受现在', tendency: 'D' }
        ]}
    },
    {
        id: 'q8',
        category: 'FRIENDSHIP',
        literary: { question: '友情的画卷中，你最珍视哪一抹色彩？', options: [
            { text: '心有灵犀的默契', tendency: 'A' },
            { text: '并肩走过的足迹', tendency: 'B' },
            { text: '无声却温暖的陪伴', tendency: 'C' },
            { text: '风雨同舟的不离不弃', tendency: 'D' }
        ]},
        simple: { question: '和朋友相处，你最珍惜？', options: [
            { text: '彼此的理解和包容', tendency: 'A' },
            { text: '一起创造的回忆', tendency: 'B' },
            { text: '默默的陪伴', tendency: 'C' },
            { text: '关键时刻的支持', tendency: 'D' }
        ]}
    },
    {
        id: 'q9',
        category: 'EMOTION',
        literary: { question: '在你心中，爱情是什么模样？', options: [
            { text: '锦上添花的诗意，而非生命的全部', tendency: 'A' },
            { text: '全心奔赴的旅程，不留遗憾', tendency: 'B' },
            { text: '可遇不可求的缘分', tendency: 'C' },
            { text: '不如将这份热忱留给更值得的人', tendency: 'D' }
        ]},
        simple: { question: '你认为爱情是？', options: [
            { text: '锦上添花，不是必需品', tendency: 'A' },
            { text: '全心投入，必须认真', tendency: 'B' },
            { text: '可遇不可求，随缘', tendency: 'C' },
            { text: '可有可无，不如专注自己', tendency: 'D' }
        ]}
    },
    {
        id: 'q10',
        category: 'FRIENDSHIP',
        literary: { question: '众人相聚时，你常扮演怎样的角色？', options: [
            { text: '点燃氛围的火花', tendency: 'A' },
            { text: '运筹帷幄的主角', tendency: 'B' },
            { text: '静守一隅的旁观者', tendency: 'C' },
            { text: '随性自在的旅人', tendency: 'D' }
        ]},
        simple: { question: '朋友聚会，你通常是？', options: [
            { text: '活跃气氛，带动大家', tendency: 'A' },
            { text: '组织安排，操心一切', tendency: 'B' },
            { text: '安静倾听，偶尔发言', tendency: 'C' },
            { text: '随性参与，轻松自在', tendency: 'D' }
        ]}
    },
    {
        id: 'q11',
        category: 'LIFE',
        literary: { question: '压力如山倒来时，你如何找到呼吸的空间？', options: [
            { text: '举重若轻，相信自己的节奏', tendency: 'A' },
            { text: '全力以赴，攀登至山顶', tendency: 'B' },
            { text: '默默发力，不问归期', tendency: 'C' },
            { text: '适度放松，与压力和解', tendency: 'D' }
        ]},
        simple: { question: '面对学习/工作压力，你会？', options: [
            { text: '轻松应对，相信自己', tendency: 'A' },
            { text: '全力以赴，做到最好', tendency: 'B' },
            { text: '默默努力，不声张', tendency: 'C' },
            { text: '适当放松，避免焦虑', tendency: 'D' }
        ]}
    },
    {
        id: 'q12',
        category: 'FRIENDSHIP',
        literary: { question: '友情的哪个瞬间，曾让你热泪盈眶？', options: [
            { text: '那些被细心收藏的琐碎日常', tendency: 'A' },
            { text: '在流言中坚定站在我身边的身影', tendency: 'B' },
            { text: '低谷时静默陪伴的温暖', tendency: 'C' },
            { text: '无需多言便懂的默契与扶持', tendency: 'D' }
        ]},
        simple: { question: '最让你感动的友情瞬间是？', options: [
            { text: '记得我随口提到的小小心愿', tendency: 'A' },
            { text: '在我受委屈时挺身而出', tendency: 'B' },
            { text: '难过时默默陪在我身边', tendency: 'C' },
            { text: '二话不说就伸出的援手', tendency: 'D' }
        ]}
    },
    {
        id: 'q13',
        category: 'EMOTION',
        literary: { question: '负面情绪如阴云笼罩时，你如何等待天晴？', options: [
            { text: '与好友倾诉，让阳光照进来', tendency: 'A' },
            { text: '整理思绪，拨云见日', tendency: 'B' },
            { text: '独自沉淀，不愿打扰世界', tendency: 'C' },
            { text: '转移注意力，让风吹散', tendency: 'D' }
        ]},
        simple: { question: '你如何处理负面情绪？', options: [
            { text: '和朋友倾诉', tendency: 'A' },
            { text: '积极面对，想办法解决', tendency: 'B' },
            { text: '独自消化，不打扰别人', tendency: 'C' },
            { text: '转移注意力，不去想', tendency: 'D' }
        ]}
    },
    {
        id: 'q14',
        category: 'FRIENDSHIP',
        literary: { question: '在你心中，朋友是什么的存在？', options: [
            { text: '相知相懂的灵魂伴侣', tendency: 'A' },
            { text: '并肩同行的战友', tendency: 'B' },
            { text: '无声胜有声的知己', tendency: 'C' },
            { text: '锦上添花的温暖过客', tendency: 'D' }
        ]},
        simple: { question: '你对朋友的定义是？', options: [
            { text: '相互理解，彼此包容', tendency: 'A' },
            { text: '同甘共苦，讲义气', tendency: 'B' },
            { text: '默默陪伴，无需多言', tendency: 'C' },
            { text: '关键时刻，伸手相助', tendency: 'D' }
        ]}
    },
    {
        id: 'q15',
        category: 'LIFE',
        literary: { question: '你觉得，人生的真谛是什么？', options: [
            { text: '体味百态，丰富每一程山水', tendency: 'A' },
            { text: '燃烧自己，照亮一片天空', tendency: 'B' },
            { text: '肩负责任，走好每一步路', tendency: 'C' },
            { text: '珍惜今天，不问明日忧欢', tendency: 'D' }
        ]},
        simple: { question: '你认为人生的意义在于？', options: [
            { text: '体验不同的经历', tendency: 'A' },
            { text: '实现自己的价值', tendency: 'B' },
            { text: '承担应有的责任', tendency: 'C' },
            { text: '过好当下的每一天', tendency: 'D' }
        ]}
    },
    {
        id: 'q16',
        category: 'MEMORY',
        literary: { question: '回首来路，你更认同自己是谁的影子？', options: [
            { text: '热烈而包容的存在', tendency: 'A' },
            { text: '耿直而担当的存在', tendency: 'B' },
            { text: '内敛而坚韧的存在', tendency: 'C' },
            { text: '通透而真实的存在', tendency: 'D' }
        ]},
        simple: { question: '你更像哪种性格的人？', options: [
            { text: '热情包容型', tendency: 'A' },
            { text: '耿直仗义型', tendency: 'B' },
            { text: '内敛担当型', tendency: 'C' },
            { text: '通透真实型', tendency: 'D' }
        ]}
    },
    {
        id: 'q17',
        category: 'EMOTION',
        literary: { question: '异地相隔，你如何守护这段情谊？', options: [
            { text: '相信真心，不惧距离', tendency: 'A' },
            { text: '创造相聚，让思念落地', tendency: 'B' },
            { text: '顺其自然，缘分天注定', tendency: 'C' },
            { text: '距离太远，难以维系', tendency: 'D' }
        ]},
        simple: { question: '你如何看待异地恋？', options: [
            { text: '相信感情，坚持到底', tendency: 'A' },
            { text: '努力维持，创造机会', tendency: 'B' },
            { text: '顺其自然，不强求', tendency: 'C' },
            { text: '比较困难，可能放弃', tendency: 'D' }
        ]}
    },
    {
        id: 'q18',
        category: 'FRIENDSHIP',
        literary: { question: '朋友迷失方向时，你会如何轻声提醒？', options: [
            { text: '温柔接纳，陪你慢慢回归', tendency: 'A' },
            { text: '直言相告，希望你能醒悟', tendency: 'B' },
            { text: '静观其变，适时推一把', tendency: 'C' },
            { text: '尊重选择，不多言打扰', tendency: 'D' }
        ]},
        simple: { question: '朋友犯错，你会？', options: [
            { text: '包容理解，帮助改正', tendency: 'A' },
            { text: '直接指出，希望改进', tendency: 'B' },
            { text: '默默观察，适当提醒', tendency: 'C' },
            { text: '看情况，不干涉太多', tendency: 'D' }
        ]}
    },
    {
        id: 'q19',
        category: 'LIFE',
        literary: { question: '你更愿意把目光投向何方？', options: [
            { text: '内心深处，那片柔软的角落', tendency: 'A' },
            { text: '前方的路，那片待征服的山巅', tendency: 'B' },
            { text: '肩上的责任，那份应尽的义务', tendency: 'C' },
            { text: '此刻的舒适，让心灵小憩', tendency: 'D' }
        ]},
        simple: { question: '你更重视？', options: [
            { text: '内心的感受', tendency: 'A' },
            { text: '实际的结果', tendency: 'B' },
            { text: '责任和义务', tendency: 'C' },
            { text: '自己的舒适', tendency: 'D' }
        ]}
    },
    {
        id: 'q20',
        category: 'MEMORY',
        literary: { question: '如果时光可以倒流，你会选择？', options: [
            { text: '修补那些小小的遗憾', tendency: 'A' },
            { text: '珍视当下的一切美好', tendency: 'B' },
            { text: '付出更多汗水与努力', tendency: 'C' },
            { text: '与爱的人共度更多时光', tendency: 'D' }
        ]},
        simple: { question: '如果可以回到过去，你会？', options: [
            { text: '改变一些遗憾的事', tendency: 'A' },
            { text: '保持现状，珍惜现在', tendency: 'B' },
            { text: '更努力学习和成长', tendency: 'C' },
            { text: '多和朋友相处', tendency: 'D' }
        ]}
    },
    {
        id: 'q21',
        category: 'EMOTION',
        literary: { question: '为了心中所爱，你愿意改变多少？', options: [
            { text: '适当调整，但不失本真', tendency: 'A' },
            { text: '愿意改变，因为爱是成全', tendency: 'B' },
            { text: '犹豫不决，需要时间思量', tendency: 'C' },
            { text: '保持原样，真我不移', tendency: 'D' }
        ]},
        simple: { question: '你会为了爱情改变自己吗？', options: [
            { text: '适当改变，保持自我', tendency: 'A' },
            { text: '愿意改变，因为爱', tendency: 'B' },
            { text: '比较犹豫，要看情况', tendency: 'C' },
            { text: '不会，保持原本的自己', tendency: 'D' }
        ]}
    },
    {
        id: 'q22',
        category: 'FRIENDSHIP',
        literary: { question: '朋友开口借贷，你会如何抉择？', options: [
            { text: '尽力相助，不计回报', tendency: 'A' },
            { text: '问清缘由，再做定夺', tendency: 'B' },
            { text: '视关系深浅，量力而行', tendency: 'C' },
            { text: '衡量自身，不勉强硬撑', tendency: 'D' }
        ]},
        simple: { question: '朋友借钱，你会？', options: [
            { text: '尽力帮助，不计较', tendency: 'A' },
            { text: '问清楚用途，再决定', tendency: 'B' },
            { text: '根据关系亲疏决定', tendency: 'C' },
            { text: '看自己情况，不勉强', tendency: 'D' }
        ]}
    },
    {
        id: 'q23',
        category: 'LIFE',
        literary: { question: '你向往怎样的诗与远方？', options: [
            { text: '无风无雨，平安喜乐', tendency: 'A' },
            { text: '星辰大海，征途无限', tendency: 'B' },
            { text: '岁月静好，现世安稳', tendency: 'C' },
            { text: '诗酒趁年华，自由无拘束', tendency: 'D' }
        ]},
        simple: { question: '你对未来的期望是？', options: [
            { text: '快乐就好，没有压力', tendency: 'A' },
            { text: '事业成功，家庭幸福', tendency: 'B' },
            { text: '稳定踏实，岁月静好', tendency: 'C' },
            { text: '自由洒脱，无拘无束', tendency: 'D' }
        ]}
    },
    {
        id: 'q24',
        category: 'FRIENDSHIP',
        literary: { question: '与好友共度的时光，什么最让你开怀？', options: [
            { text: '虚拟世界的并肩作战', tendency: 'A' },
            { text: '共同策划的每一次惊喜', tendency: 'B' },
            { text: '那些默默陪伴的日子', tendency: 'C' },
            { text: '深夜倾诉的坦诚相对', tendency: 'D' }
        ]},
        simple: { question: '和朋友们一起最开心的事是？', options: [
            { text: '一起打游戏', tendency: 'A' },
            { text: '一起组织活动', tendency: 'B' },
            { text: '一起学习进步', tendency: 'C' },
            { text: '一起分享心事', tendency: 'D' }
        ]}
    },
    {
        id: 'q25',
        category: 'EMOTION',
        literary: { question: '当爱意涌上心头，你如何表达这份心意？', options: [
            { text: '于无声处听惊雷，于细微处见真心', tendency: 'A' },
            { text: '大声说出来，让世界听见', tendency: 'B' },
            { text: '用行动证明，行动胜于言语', tendency: 'C' },
            { text: '适度表达，保持自我的边界', tendency: 'D' }
        ]},
        simple: { question: '你如何表达爱意？', options: [
            { text: '默默关心，细节体现', tendency: 'A' },
            { text: '直接表达，热情主动', tendency: 'B' },
            { text: '行动证明，不轻易说', tendency: 'C' },
            { text: '适当表达，保持独立', tendency: 'D' }
        ]}
    }
];

function init() {
    if (!localStorage.getItem('jskbti_questions')) {
        localStorage.setItem('jskbti_questions', JSON.stringify(DEFAULT_QUESTIONS));
    }
    showPage('home-page');
}

function getQuestions() {
    const stored = localStorage.getItem('jskbti_questions');
    if (stored) {
        const questions = JSON.parse(stored);
        if (questions.length > 0 && questions[0].literary && questions[0].simple) {
            return questions;
        }
    }
    localStorage.removeItem('jskbti_questions');
    return DEFAULT_QUESTIONS;
}

function saveQuestions(questions) {
    localStorage.setItem('jskbti_questions', JSON.stringify(questions));
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showPresetup() {
    selectedMode = 'literary';
    selectedType = 'single';
    document.querySelectorAll('.setup-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelector('[data-mode="literary"]').classList.add('selected');
    document.querySelector('[data-type="single"]').classList.add('selected');
    showPage('presetup-page');
}

function selectMode(btn) {
    document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMode = btn.dataset.mode;
}

function selectType(btn) {
    document.querySelectorAll('[data-type]').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedType = btn.dataset.type;
}

function startTest() {
    currentQuestionIndex = 0;
    answers = {};
    showPage('test-page');
    renderQuestion();
}

function renderQuestion() {
    const questions = getQuestions();
    const question = questions[currentQuestionIndex];
    const total = questions.length;

    const content = question[selectedMode] || question.simple;

    document.getElementById('progress-fill').style.width = ((currentQuestionIndex + 1) / total * 100) + '%';
    document.getElementById('progress-text').textContent = `${currentQuestionIndex + 1} / ${total}`;
    document.getElementById('current-num').textContent = currentQuestionIndex + 1;
    document.getElementById('question-category').textContent = CATEGORY_LABELS[question.category] || '未知';
    document.getElementById('question-text').textContent = content.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    content.options.forEach((option, index) => {
        const label = String.fromCharCode(65 + index);
        const btn = document.createElement('button');
        btn.className = 'option-card' + (answers[currentQuestionIndex] === label ? ' selected' : '');
        btn.onclick = () => selectOption(label);
        btn.innerHTML = `
            <span class="option-letter">${label}</span>
            <span class="option-text">${option.text}</span>
        `;
        optionsContainer.appendChild(btn);
    });

    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;

    const nextText = document.getElementById('next-text');
    if (currentQuestionIndex === total - 1) {
        nextText.textContent = '查看结果';
    } else {
        nextText.textContent = '下一题';
    }
}

function selectOption(option) {
    answers[currentQuestionIndex] = option;
    renderQuestion();
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function nextQuestion() {
    if (answers[currentQuestionIndex] === undefined) {
        return;
    }

    const questions = getQuestions();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        showResult();
    }
}

function calculateResult() {
    const questions = getQuestions();
    const scores = { A: 0, B: 0, C: 0, D: 0 };

    questions.forEach((question, index) => {
        const answer = answers[index];
        if (answer) {
            const content = question[selectedMode] || question.simple;
            const optionIndex = answer.charCodeAt(0) - 65;
            const option = content.options[optionIndex];
            if (option && option.tendency) {
                option.tendency.split('').forEach(char => {
                    if (scores[char] !== undefined) {
                        scores[char]++;
                    }
                });
            }
        }
    });

    const sortedTypes = Object.entries(scores)
        .sort((a, b) => b[1] - a[1]);

    if (selectedType === 'single') {
        return [sortedTypes[0][0]];
    }

    if (selectedType === 'auto') {
        const topScore = sortedTypes[0][1];
        const secondScore = sortedTypes[1][1];
        if (secondScore >= topScore * 0.7) {
            return [sortedTypes[0][0], sortedTypes[1][0]];
        } else {
            return [sortedTypes[0][0]];
        }
    }

    const topScore = sortedTypes[0][1];
    const secondScore = sortedTypes[1][1];
    const thirdScore = sortedTypes[2][1];

    if (secondScore < topScore * 0.6) {
        return [sortedTypes[0][0]];
    }

    let result = sortedTypes.filter(([_, score]) => score >= topScore * 0.6);
    return result.map(([type]) => type);
}

function showResult() {
    const resultTypes = calculateResult();
    
    const namesContainer = document.getElementById('result-names');
    namesContainer.innerHTML = resultTypes.map(type => 
        `<span class="matching-person">${PERSONALITY_TYPES[type].name}</span>`
    ).join(selectedType === 'single' ? '' : ' + ');

    const primaryType = resultTypes[0];
    const personality = PERSONALITY_TYPES[primaryType];

    document.getElementById('result-background').textContent = 
        selectedMode === 'literary' ? personality.background : personality.background_simple;
    document.getElementById('result-emotion').textContent = 
        selectedMode === 'literary' ? personality.emotion : personality.emotion_simple;
    document.getElementById('result-life').textContent = 
        selectedMode === 'literary' ? personality.life : personality.life_simple;

    const memoryContainer = document.getElementById('memory-tags');
    memoryContainer.innerHTML = '';
    const allMemories = resultTypes.flatMap(type => PERSONALITY_TYPES[type].memory);
    const uniqueMemories = [...new Set(allMemories)];
    uniqueMemories.slice(0, 6).forEach(memory => {
        const tag = document.createElement('span');
        tag.className = 'memory-tag';
        tag.textContent = memory;
        memoryContainer.appendChild(tag);
    });

    showPage('result-page');
}

function restartTest() {
    currentQuestionIndex = 0;
    answers = {};
    showPage('presetup-page');
}

function goHome() {
    showPage('home-page');
}

function showAdminLogin() {
    document.getElementById('admin-password').value = '';
    document.getElementById('login-error').textContent = '';
    showPage('admin-login-page');
}

function checkAdminPassword() {
    const password = document.getElementById('admin-password').value;
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        showAdminPage();
    } else {
        document.getElementById('login-error').textContent = '密码错误';
    }
}

function showAdminPage() {
    renderQuestionList();
    showPage('admin-page');
}

function renderQuestionList() {
    const questions = getQuestions();
    const container = document.getElementById('question-list');
    container.innerHTML = '';

    questions.forEach((q, index) => {
        const item = document.createElement('div');
        item.className = 'question-item';
        item.innerHTML = `
            <div class="question-content">
                <div class="question-header">
                    <div class="question-category">${CATEGORY_LABELS[q.category]}</div>
                    <span class="question-number">第${index + 1}题</span>
                </div>
                <div class="question-text">文艺: ${q.literary.question}</div>
                <div class="question-text">简洁: ${q.simple.question}</div>
                <div class="question-options">
                    ${q.simple.options.map((option, idx) => {
                        const label = String.fromCharCode(65 + idx);
                        return `${label}: ${option.text} (${option.tendency})`;
                    }).join('<br>')}
                </div>
                <div class="question-actions">
                    <button class="btn-edit" onclick="editQuestion('${q.id}')">编辑</button>
                    <button class="btn-delete" onclick="deleteQuestion('${q.id}')">删除</button>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function showAddQuestionForm() {
    editingQuestionId = null;
    document.getElementById('form-title').textContent = '新增题目';
    document.getElementById('question-category').value = 'EMOTION';
    document.getElementById('question-content-literary').value = '';
    document.getElementById('question-content-simple').value = '';
    document.getElementById('option-inputs').innerHTML = getDefaultOptionInputs();
    document.getElementById('question-form').classList.remove('hidden');
}

function getDefaultOptionInputs() {
    return `
        <div class="option-input-row">
            <input type="text" class="input-field option-text" placeholder="文艺版选项A">
            <input type="text" class="input-field option-text-simple" placeholder="简洁版选项A">
            <select class="input-field option-match">
                <option value="A">邓宏锦</option>
                <option value="B">金熙</option>
                <option value="C">岳思语</option>
                <option value="D">陈舒窈</option>
            </select>
            <button class="btn-remove-option" onclick="removeOptionInput(this)">×</button>
        </div>
        <div class="option-input-row">
            <input type="text" class="input-field option-text" placeholder="文艺版选项B">
            <input type="text" class="input-field option-text-simple" placeholder="简洁版选项B">
            <select class="input-field option-match">
                <option value="A">邓宏锦</option>
                <option value="B">金熙</option>
                <option value="C">岳思语</option>
                <option value="D">陈舒窈</option>
            </select>
            <button class="btn-remove-option" onclick="removeOptionInput(this)">×</button>
        </div>
    `;
}

function addOptionInput() {
    const optionInputs = document.getElementById('option-inputs');
    const rows = optionInputs.querySelectorAll('.option-input-row');
    const nextLabel = String.fromCharCode(65 + rows.length);
    const newRow = document.createElement('div');
    newRow.className = 'option-input-row';
    newRow.innerHTML = `
        <input type="text" class="input-field option-text" placeholder="文艺版选项${nextLabel}">
        <input type="text" class="input-field option-text-simple" placeholder="简洁版选项${nextLabel}">
        <select class="input-field option-match">
            <option value="A">邓宏锦</option>
            <option value="B">金熙</option>
            <option value="C">岳思语</option>
            <option value="D">陈舒窈</option>
        </select>
        <button class="btn-remove-option" onclick="removeOptionInput(this)">×</button>
    `;
    optionInputs.appendChild(newRow);
}

function removeOptionInput(button) {
    const optionInputs = document.getElementById('option-inputs');
    if (optionInputs.children.length > 2) {
        button.parentElement.remove();
    }
}

function editQuestion(id) {
    const questions = getQuestions();
    const question = questions.find(q => q.id === id);
    if (!question) return;

    editingQuestionId = id;
    document.getElementById('form-title').textContent = '编辑题目';
    document.getElementById('question-category').value = question.category;
    document.getElementById('question-content-literary').value = question.literary.question;
    document.getElementById('question-content-simple').value = question.simple.question;
    
    const optionInputs = document.getElementById('option-inputs');
    optionInputs.innerHTML = '';
    
    question.simple.options.forEach((opt, idx) => {
        const label = String.fromCharCode(65 + idx);
        const literaryText = question.literary.options[idx] ? question.literary.options[idx].text : '';
        const newRow = document.createElement('div');
        newRow.className = 'option-input-row';
        newRow.innerHTML = `
            <input type="text" class="input-field option-text" value="${literaryText}" placeholder="文艺版选项${label}">
            <input type="text" class="input-field option-text-simple" value="${opt.text}" placeholder="简洁版选项${label}">
            <select class="input-field option-match">
                <option value="A" ${opt.tendency === 'A' ? 'selected' : ''}>邓宏锦</option>
                <option value="B" ${opt.tendency === 'B' ? 'selected' : ''}>金熙</option>
                <option value="C" ${opt.tendency === 'C' ? 'selected' : ''}>岳思语</option>
                <option value="D" ${opt.tendency === 'D' ? 'selected' : ''}>陈舒窈</option>
            </select>
            <button class="btn-remove-option" onclick="removeOptionInput(this)">×</button>
        `;
        optionInputs.appendChild(newRow);
    });
    
    document.getElementById('question-form').classList.remove('hidden');
}

function hideQuestionForm() {
    document.getElementById('question-form').classList.add('hidden');
    editingQuestionId = null;
}

function saveQuestion() {
    const category = document.getElementById('question-category').value;
    const literaryQuestion = document.getElementById('question-content-literary').value.trim();
    const simpleQuestion = document.getElementById('question-content-simple').value.trim();
    const optionRows = document.querySelectorAll('.option-input-row');
    
    const literaryOptions = [];
    const simpleOptions = [];
    let hasEmpty = false;
    
    optionRows.forEach((row, idx) => {
        const literaryText = row.querySelector('.option-text').value.trim();
        const simpleText = row.querySelector('.option-text-simple').value.trim();
        const tendency = row.querySelector('.option-match').value;
        
        if (!literaryText || !simpleText) hasEmpty = true;
        
        literaryOptions.push({ text: literaryText, tendency });
        simpleOptions.push({ text: simpleText, tendency });
    });
    
    if (!literaryQuestion || !simpleQuestion || hasEmpty) {
        alert('请填写完整的文艺版和简洁版题目及选项');
        return;
    }

    const questions = getQuestions();

    if (editingQuestionId) {
        const index = questions.findIndex(q => q.id === editingQuestionId);
        if (index !== -1) {
            questions[index] = {
                id: editingQuestionId,
                category,
                literary: { question: literaryQuestion, options: literaryOptions },
                simple: { question: simpleQuestion, options: simpleOptions }
            };
        }
    } else {
        const newQuestion = {
            id: 'q' + Date.now(),
            category,
            literary: { question: literaryQuestion, options: literaryOptions },
            simple: { question: simpleQuestion, options: simpleOptions }
        };
        questions.push(newQuestion);
    }

    saveQuestions(questions);
    hideQuestionForm();
    renderQuestionList();
}

function deleteQuestion(id) {
    if (!confirm('确定要删除这道题目吗？')) return;

    let questions = getQuestions();
    questions = questions.filter(q => q.id !== id);
    saveQuestions(questions);
    renderQuestionList();
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    showPage('home-page');
}

document.addEventListener('DOMContentLoaded', init);
