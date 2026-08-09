/* ===================== i18n ===================== */
const translations = {
  ru: {
    "nav.problem":"Проблема","nav.how":"Как это работает","nav.map":"Карта","nav.order":"Заказать","nav.track":"Отследить","nav.points":"Пункты","nav.team":"О нас",
    "map.eyebrow":"Живая карта","map.title":"Всё, что можно перевезти по городу","map.sub":"Склад, кафе, аптеки, административные здания и пункты выдачи — вся сеть NovaRescue на одной карте Алатау.",
    "map.legWarehouse":"Склад","map.legCafe":"Кафе и магазины","map.legAdmin":"Административные здания","map.legPoint":"Пункты выдачи","map.legRoute":"Маршрут робота",
    "map.typeWarehouse":"Склад","map.typeCafe":"Кафе / магазин","map.typeAdmin":"Административное здание","map.typePoint":"Пункт выдачи",
    "hero.eyebrow":"Алатау · умная городская логистика",
    "hero.titleLine1":"Доставка,","hero.titleLine2":"которая живёт под городом",
    "hero.sub":"NovaRescue — автономная роботизированная сеть: склад на окраине города сортирует товар, курьер-робот везёт его подземными тоннелями под линиями ЛРТ прямо к ближайшему пункту выдачи.",
    "hero.ctaOrder":"Оформить заказ","hero.ctaHow":"Как это устроено",
    "hero.min":"мин","hero.statSpeed":"средняя доставка","hero.statAuto":"автономная работа","hero.km":"км пробок","hero.statTraffic":"маршрут под ЛРТ",
    "hero.badgeWarehouse":"Склад · окраина","hero.badgeTunnel":"Тоннель под ЛРТ","hero.badgePoint":"Пункт выдачи",
    "problem.eyebrow":"Почему сейчас","problem.title":"Города задыхаются от собственной логистики",
    "problem.c1t":"Рост объёмов доставки","problem.c1p":"Количество заказов растёт быстрее, чем городская инфраструктура успевает под них подстраиваться.",
    "problem.c2t":"Пробки на дорогах","problem.c2p":"Курьерский транспорт стоит в тех же заторах, что и весь остальной город.",
    "problem.c3t":"Высокие затраты времени","problem.c3p":"Каждая лишняя минута в пути — это стоимость, которую в итоге оплачивает клиент.",
    "problem.c4t":"Опасный ручной труд","problem.c4p":"Перевозка тяжёлых грузов людьми — это риск травм и нагрузка на здоровье курьеров.",
    "problem.c5t":"Безопасность операций","problem.c5p":"Логистика внутри города требует постоянного контроля — человеческий фактор здесь особенно уязвим.",
    "problem.solution":"NovaRescue решает всё это с помощью автономной роботизированной системы под управлением искусственного интеллекта — доставка становится быстрее, безопаснее и эффективнее.",
    "how.eyebrow":"Маршрут заказа","how.title":"От склада на окраине — до вашей двери",
    "how.s1tag":"Станция 1","how.s1t":"Склад на окраине города","how.s1p":"Товары от партнёров — кафе, магазинов, аптек — поступают на большой сортировочный склад за пределами города.",
    "how.s2tag":"Станция 2","how.s2t":"Автоматическая сортировка","how.s2p":"Система распределяет посылки по направлениям и передаёт их роботу-курьеру для городской перевозки.",
    "how.s3tag":"Станция 3","how.s3t":"Подземный тоннель под ЛРТ","how.s3p":"Робот движется по выделенным подземным маршрутам под линиями лёгкого рельсового транспорта — без светофоров и пробок.",
    "how.s4tag":"Станция 4","how.s4t":"Пункт выдачи рядом с вами","how.s4p":"В каждом ЖК и на людных точках города — пункт выдачи. Заберите заказ по трек-коду или геолокации.",
    "how.f1t":"Быстрая доставка","how.f1p":"Едет там, где нет пробок — под землёй",
    "how.f2t":"Безопасность","how.f2p":"Контроль и мониторинг груза на всём пути",
    "how.f3t":"ИИ-навигация","how.f3p":"Маршрут строится и корректируется автоматически",
    "how.f4t":"Автономность","how.f4p":"Работает без постоянного участия человека",
    "how.robotVex":"Робот-курьер на основе VEX Robotics","how.robotBuild":"Модульная конструкция для быстрого обслуживания",
    "order.eyebrow":"Отправка","order.title":"Оформите заказ за 4 шага",
    "order.from":"Откуда забрать","order.opt.cafe":"Кафе «Дастархан» — бешбармак, плов","order.opt.pharm":"Кафе «Шыгыс» — манты, лагман","order.opt.shop":"Кофе-бар «Мустай» — кофе, десерты","order.opt.admin":"Аптека «Europharma» — лекарства",
    "order.to":"Пункт выдачи","order.pt1":"ПВЗ №1 — ЖК Alatau City","order.pt2":"ПВЗ №2 — ЖК Highvill","order.pt3":"ПВЗ №3 — Центральная площадь",
    "order.desc":"Что доставляем","order.descPh":"Например: обед из кафе, лекарства, документы",
    "order.geo":"Найти ближайший пункт по геолокации","order.submit":"Отправить заказ",
    "order.emptyState":"Здесь появится трек-номер и штрихкод вашей посылки",
    "order.ticketLabel":"Посылка принята складом NovaRescue","order.statusSorting":"Сортировка",
    "track.eyebrow":"Статус","track.title":"Отследите посылку по трек-номеру","track.ph":"Введите код, например NR-482913","track.submit":"Отследить",
    "track.step1t":"Принято складом","track.step1p":"Товар отсканирован и отсортирован",
    "track.step2t":"Передано роботу","track.step2p":"Курьер-робот начал маршрут под ЛРТ",
    "track.step3t":"В пути","track.step3p":"Подземный тоннель, расчётное время — 12 мин",
    "track.step4t":"В пункте выдачи","track.step4p":"Можно забрать по коду или QR",
    "points.eyebrow":"Сеть","points.title":"Пункт выдачи в каждом дворе","points.sub":"ПВЗ устанавливаются в жилых комплексах и людных местах города — заказ всегда рядом.","points.km":"км",
    "points.p1":"ЖК Alatau City","points.p1a":"пр. Момышулы, 15",
    "points.p2":"ЖК Highvill","points.p2a":"ул. Аль-Фараби, 140",
    "points.p3":"Центральная площадь","points.p3a":"пл. Республики, 3",
    "points.p4":"ЖК Botanic City","points.p4a":"ул. Ботанический сад, 8",
    "team.eyebrow":"Команда","team.title":"Кто стоит за NovaRescue",
    "team.p1":"Команда NovaRescue — Школа-гимназия №28. Проект объединяет безопасность, искусственный интеллект и роботизированные технологии в одну логистическую платформу нового поколения.",
    "team.p2":"Первой площадкой для пилотного запуска рассматривается город Алатау: подземные маршруты позволят избежать пробок и сделать доставку полностью безопасной.",
    "team.quote":"«Технологии будущего для безопасной и эффективной городской логистики»",
    "team.plan1":"Совершенствование прототипа","team.plan2":"Полноценная модель с использованием ИИ","team.plan3":"Запуск пилота в городе Алатау","team.plan4":"Интеграция в концепцию Smart City","team.plan5":"Выход на международный рынок",
    "team.achieveTitle":"Наши достижения",
    "team.ach1":"Проект представлен вице-министру Республики Казахстан и получил положительную оценку и поддержку",
    "team.ach2":"Проект представлен советнику Президента Республики Казахстан",
    "team.ach3":"Главная цель — превратить NovaRescue в востребованный технологический продукт в городах Казахстана и за его пределами",
    "footer.tag":"Технологии будущего для безопасной и эффективной городской логистики.","footer.school":"Школа-гимназия №28 · г. Алатау"
  },
  kk: {
    "nav.problem":"Мәселе","nav.how":"Қалай жұмыс істейді","nav.map":"Карта","nav.order":"Тапсырыс беру","nav.track":"Бақылау","nav.points":"Пункттер","nav.team":"Біз туралы",
    "map.eyebrow":"Тірі карта","map.title":"Қала бойынша тасымалдауға болатынның бәрі","map.sub":"Склад, кафе, дәріхана, әкімшілік ғимараттар және пункттер — NovaRescue желісінің барлығы бір картада.",
    "map.legWarehouse":"Склад","map.legCafe":"Кафе мен дүкендер","map.legAdmin":"Әкімшілік ғимараттар","map.legPoint":"Тапсырыс алу пункттері","map.legRoute":"Робот маршруты",
    "map.typeWarehouse":"Склад","map.typeCafe":"Кафе / дүкен","map.typeAdmin":"Әкімшілік ғимарат","map.typePoint":"Тапсырыс алу пункті",
    "hero.eyebrow":"Алатау · ақылды қалалық логистика",
    "hero.titleLine1":"Жеткізу,","hero.titleLine2":"қала астында өмір сүреді",
    "hero.sub":"NovaRescue — автономды роботтандырылған желі: қала шетіндегі склад тауарды сұрыптайды, курьер-робот оны ЛРТ желісінің астындағы жерасты тоннельдері арқылы ең жақын пунктке жеткізеді.",
    "hero.ctaOrder":"Тапсырыс беру","hero.ctaHow":"Қалай жұмыс істейді",
    "hero.min":"мин","hero.statSpeed":"орташа жеткізу уақыты","hero.statAuto":"автономды жұмыс","hero.km":"км кептеліс","hero.statTraffic":"ЛРТ астындағы маршрут",
    "hero.badgeWarehouse":"Склад · шет аймақ","hero.badgeTunnel":"ЛРТ астындағы тоннель","hero.badgePoint":"Тапсырыс алу пункті",
    "problem.eyebrow":"Неге қазір","problem.title":"Қалалар өз логистикасынан тарыға бастады",
    "problem.c1t":"Жеткізу көлемінің өсуі","problem.c1p":"Тапсырыс саны қала инфрақұрылымының бейімделу жылдамдығынан асып барады.",
    "problem.c2t":"Жолдағы кептелістер","problem.c2p":"Курьерлік көлік қаланың басқа бөлігімен бірге кептелісте тұрады.",
    "problem.c3t":"Уақыттың көп кетуі","problem.c3p":"Жолда өткізілген әрбір қосымша минут — соңында клиент төлейтін шығын.",
    "problem.c4t":"Қауіпті қол еңбегі","problem.c4p":"Ауыр жүкті адамдардың тасымалдауы — жарақат тәуекелі мен курьерлердің денсаулығына түсетін жүктеме.",
    "problem.c5t":"Операциялар қауіпсіздігі","problem.c5p":"Қала ішіндегі логистика үнемі бақылауды талап етеді — адами фактор осы жерде әсіресе осал.",
    "problem.solution":"NovaRescue мұның барлығын жасанды интеллект басқаратын автономды роботтандырылған жүйе арқылы шешеді — жеткізу жылдамырақ, қауіпсізірек және тиімдірек болады.",
    "how.eyebrow":"Тапсырыс маршруты","how.title":"Қала шетіндегі склад — сіздің есігіңізге дейін",
    "how.s1tag":"1-станция","how.s1t":"Қала шетіндегі склад","how.s1p":"Серіктестерден — кафе, дүкен, дәріхана — тауарлар қала сыртындағы үлкен сұрыптау складына түседі.",
    "how.s2tag":"2-станция","how.s2t":"Автоматты сұрыптау","how.s2p":"Жүйе жіберілімдерді бағыттар бойынша бөліп, оларды қала бойынша тасымалдау үшін курьер-роботқа береді.",
    "how.s3tag":"3-станция","how.s3t":"ЛРТ астындағы жерасты тоннелі","how.s3p":"Робот жеңіл рельсті көлік желісінің астындағы арнайы жерасты маршруттарымен қозғалады — бағдаршамсыз және кептеліссіз.",
    "how.s4tag":"4-станция","how.s4t":"Сізге жақын пункт","how.s4p":"Әр ЖК-да және қала бойынша адам жүретін жерлерде тапсырыс алу пункті бар. Тапсырысты трек-код немесе геолокация арқылы алыңыз.",
    "how.f1t":"Жылдам жеткізу","how.f1p":"Кептеліс жоқ жерде — жер астында жүреді",
    "how.f2t":"Қауіпсіздік","how.f2p":"Жол бойы жүктің бақылауы мен мониторингі",
    "how.f3t":"ЖИ-навигация","how.f3p":"Маршрут автоматты түрде құрылып, түзетіледі",
    "how.f4t":"Автономдылық","how.f4p":"Адамның үнемі қатысуынсыз жұмыс істейді",
    "how.robotVex":"VEX Robotics негізінде құрылған робот-курьер","how.robotBuild":"Жылдам сервис үшін модульды конструкция",
    "order.eyebrow":"Жіберу","order.title":"Тапсырысты 4 қадамда рәсімдеңіз",
    "order.from":"Қайдан алу керек","order.opt.cafe":"«Дастархан» кафесі — бешбармақ, плов","order.opt.pharm":"«Шыгыс» кафесі — манты, лағман","order.opt.shop":"«Мустай» кофе-бар — кофе, десертілер","order.opt.admin":"«Europharma» дәріханасы — дәрі-дәрмек",
    "order.to":"Тапсырыс алу пункті","order.pt1":"ТАП №1 — Alatau City ЖК","order.pt2":"ТАП №2 — Highvill ЖК","order.pt3":"ТАП №3 — Орталық алаң",
    "order.desc":"Не жеткіземіз","order.descPh":"Мысалы: кафеден тамақ, дәрі-дәрмек, құжаттар",
    "order.geo":"Геолокация бойынша ең жақын пунктті табу","order.submit":"Тапсырысты жіберу",
    "order.emptyState":"Мұнда сіздің жіберіліміңіздің трек-нөмірі мен штрихкоды пайда болады",
    "order.ticketLabel":"Жіберілім NovaRescue складында қабылданды","order.statusSorting":"Сұрыпталуда",
    "track.eyebrow":"Мәртебе","track.title":"Жіберілімді трек-нөмір бойынша бақылаңыз","track.ph":"Кодты енгізіңіз, мысалы NR-482913","track.submit":"Бақылау",
    "track.step1t":"Складта қабылданды","track.step1p":"Тауар сканерленіп, сұрыпталды",
    "track.step2t":"Роботқа берілді","track.step2p":"Курьер-робот ЛРТ астындағы маршрутты бастады",
    "track.step3t":"Жолда","track.step3p":"Жерасты тоннелі, болжамды уақыт — 12 мин",
    "track.step4t":"Тапсырыс алу пунктінде","track.step4p":"Код немесе QR арқылы алуға болады",
    "points.eyebrow":"Желі","points.title":"Әр аулада тапсырыс алу пункті","points.sub":"ТАП-тар тұрғын кешендер мен қаланың адам жүретін жерлерінде орнатылады — тапсырыс әрқашан жақын.","points.km":"км",
    "points.p1":"Alatau City ЖК","points.p1a":"Момышұлы д-лы, 15",
    "points.p2":"Highvill ЖК","points.p2a":"Әл-Фараби к-сі, 140",
    "points.p3":"Орталық алаң","points.p3a":"Республика алаңы, 3",
    "points.p4":"Botanic City ЖК","points.p4a":"Ботаникалық бақ к-сі, 8",
    "team.eyebrow":"Команда","team.title":"NovaRescue-дің артында кім тұр",
    "team.p1":"NovaRescue командасы — №28 мектеп-гимназиясы. Жоба қауіпсіздікті, жасанды интеллект пен роботтандырылған технологияларды жаңа буын логистикалық платформасына біріктіреді.",
    "team.p2":"Пилоттық қосудың алғашқы алаңы ретінде Алатау қаласы қарастырылуда: жерасты маршруттары кептелістерден құтылып, жеткізуді толығымен қауіпсіз етуге мүмкіндік береді.",
    "team.quote":"«Қауіпсіз әрі тиімді қалалық логистикаға арналған болашақ технологиялары»",
    "team.plan1":"Прототипті жетілдіру","team.plan2":"ЖИ қолданылатын толыққанды модель","team.plan3":"Алатау қаласында пилотты іске қосу","team.plan4":"Smart City тұжырымдамасына кірігу","team.plan5":"Халықаралық нарыққа шығу",
    "team.achieveTitle":"Біздің жетістіктер",
    "team.ach1":"Жоба Қазақстан Республикасының вице-министріне таныстырылып, оң баға мен қолдау алды",
    "team.ach2":"Жоба Қазақстан Республикасы Президентінің кеңесшісіне таныстырылды",
    "team.ach3":"Басты мақсат — NovaRescue-ді Қазақстан қалаларында және одан тыс жерлерде сұранысқа ие технологиялық өнімге айналдыру",
    "footer.tag":"Қауіпсіз әрі тиімді қалалық логистикаға арналған болашақ технологиялары.","footer.school":"№28 мектеп-гимназиясы · Алатау қ."
  },
  en: {
    "nav.problem":"Problem","nav.how":"How it works","nav.map":"Map","nav.order":"Order","nav.track":"Track","nav.points":"Pickup points","nav.team":"About us",
    "map.eyebrow":"Live map","map.title":"Everything that can move across the city","map.sub":"Warehouse, cafés, pharmacies, administrative buildings and pickup points — the whole NovaRescue network on one map of Alatau.",
    "map.legWarehouse":"Warehouse","map.legCafe":"Cafés & shops","map.legAdmin":"Administrative buildings","map.legPoint":"Pickup points","map.legRoute":"Robot route",
    "map.typeWarehouse":"Warehouse","map.typeCafe":"Café / shop","map.typeAdmin":"Administrative building","map.typePoint":"Pickup point",
    "hero.eyebrow":"Alatau · smart urban logistics",
    "hero.titleLine1":"Delivery,","hero.titleLine2":"that lives beneath the city",
    "hero.sub":"NovaRescue is an autonomous robotic network: a warehouse on the city's edge sorts goods, and a courier robot carries them through underground tunnels beneath the LRT lines straight to the nearest pickup point.",
    "hero.ctaOrder":"Place an order","hero.ctaHow":"How it works",
    "hero.min":"min","hero.statSpeed":"average delivery","hero.statAuto":"autonomous operation","hero.km":"km of traffic","hero.statTraffic":"route under the LRT",
    "hero.badgeWarehouse":"Warehouse · city edge","hero.badgeTunnel":"Tunnel under LRT","hero.badgePoint":"Pickup point",
    "problem.eyebrow":"Why now","problem.title":"Cities are choking on their own logistics",
    "problem.c1t":"Growing delivery volumes","problem.c1p":"Order numbers are outgrowing how fast city infrastructure can adapt.",
    "problem.c2t":"Traffic jams","problem.c2p":"Courier transport sits in the same congestion as the rest of the city.",
    "problem.c3t":"High time costs","problem.c3p":"Every extra minute on the road becomes a cost the customer ends up paying.",
    "problem.c4t":"Dangerous manual labour","problem.c4p":"Moving heavy loads by hand risks injury and strains couriers' health.",
    "problem.c5t":"Operational safety","problem.c5p":"In-city logistics needs constant oversight — the human factor is especially fragile here.",
    "problem.solution":"NovaRescue solves all of this with an autonomous, AI-driven robotic system — delivery becomes faster, safer and more efficient.",
    "how.eyebrow":"Order route","how.title":"From the edge-of-city warehouse to your door",
    "how.s1tag":"Stop 1","how.s1t":"Warehouse on the city's edge","how.s1p":"Goods from partners — cafés, shops, pharmacies — arrive at a large sorting warehouse outside the city.",
    "how.s2tag":"Stop 2","how.s2t":"Automatic sorting","how.s2p":"The system routes each parcel and hands it to a courier robot for the trip into the city.",
    "how.s3tag":"Stop 3","how.s3t":"Underground tunnel beneath the LRT","how.s3p":"The robot travels dedicated underground routes beneath the light-rail lines — no traffic lights, no jams.",
    "how.s4tag":"Stop 4","how.s4t":"A pickup point near you","how.s4p":"Every residential complex and busy spot in the city has a pickup point. Collect your order with a tracking code or geolocation.",
    "how.f1t":"Fast delivery","how.f1p":"Travels where there's no traffic — underground",
    "how.f2t":"Safety","how.f2p":"Cargo is monitored and controlled the whole way",
    "how.f3t":"AI navigation","how.f3p":"The route is built and adjusted automatically",
    "how.f4t":"Autonomy","how.f4p":"Runs without constant human involvement",
    "how.robotVex":"Courier robot based on VEX Robotics","how.robotBuild":"Modular design for rapid maintenance",
    "order.eyebrow":"Shipping","order.title":"Place an order in 4 steps",
    "order.from":"Pick up from","order.opt.cafe":"Dastarkhan Café — beshbarmak, pilaf","order.opt.pharm":"Shygys Café — manti, lagman","order.opt.shop":"Mustai Coffee Bar — coffee, desserts","order.opt.admin":"Europharma Pharmacy — medicine",
    "order.to":"Pickup point","order.pt1":"Point #1 — Alatau City complex","order.pt2":"Point #2 — Highvill complex","order.pt3":"Point #3 — Central Square",
    "order.desc":"What are we delivering","order.descPh":"E.g. lunch from a café, medicine, documents",
    "order.geo":"Find the nearest point by geolocation","order.submit":"Send order",
    "order.emptyState":"Your parcel's tracking number and barcode will appear here",
    "order.ticketLabel":"Parcel accepted at the NovaRescue warehouse","order.statusSorting":"Sorting",
    "track.eyebrow":"Status","track.title":"Track your parcel by its code","track.ph":"Enter a code, e.g. NR-482913","track.submit":"Track",
    "track.step1t":"Accepted at warehouse","track.step1p":"Item scanned and sorted",
    "track.step2t":"Handed to the robot","track.step2p":"Courier robot started the route under the LRT",
    "track.step3t":"On the way","track.step3p":"Underground tunnel, ETA — 12 min",
    "track.step4t":"At the pickup point","track.step4p":"Ready for pickup by code or QR",
    "points.eyebrow":"Network","points.title":"A pickup point in every yard","points.sub":"Pickup points are installed in residential complexes and busy city spots — your order is always close by.","points.km":"km",
    "points.p1":"Alatau City complex","points.p1a":"15 Momyshuly Ave.",
    "points.p2":"Highvill complex","points.p2a":"140 Al-Farabi St.",
    "points.p3":"Central Square","points.p3a":"3 Republic Sq.",
    "points.p4":"Botanic City complex","points.p4a":"8 Botanic Garden St.",
    "team.eyebrow":"Team","team.title":"Who's behind NovaRescue",
    "team.p1":"The NovaRescue team comes from School-Gymnasium No. 28. The project brings together safety, artificial intelligence and robotics into a next-generation logistics platform.",
    "team.p2":"The city of Alatau is being considered as the first site for a pilot launch: underground routes will avoid traffic and make delivery fully safe.",
    "team.quote":"\"Future technology for safe and efficient urban logistics\"",
    "team.plan1":"Improving the prototype","team.plan2":"A full AI-powered model","team.plan3":"Launching the pilot in Alatau","team.plan4":"Integration into the Smart City concept","team.plan5":"Expansion into the international market",
    "team.achieveTitle":"Our achievements",
    "team.ach1":"The project was presented to the Vice Minister of the Republic of Kazakhstan and received positive feedback and support",
    "team.ach2":"The project was presented to an advisor of the President of the Republic of Kazakhstan",
    "team.ach3":"Our main goal is to turn NovaRescue into a sought-after technology product used in Kazakhstan's cities and beyond",
    "footer.tag":"Future technology for safe and efficient urban logistics.","footer.school":"School-Gymnasium No. 28 · Alatau"
  }
};

let currentLang = localStorage.getItem("nr_lang") || "ru";

function applyLang(lang){
  currentLang = lang;
  localStorage.setItem("nr_lang", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const val = translations[lang][key];
    if(val) el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    const key = el.getAttribute("data-i18n-placeholder");
    const val = translations[lang][key];
    if(val) el.setAttribute("placeholder", val);
  });
  document.querySelectorAll(".lang-btn").forEach(b=>{
    b.classList.toggle("active", b.dataset.lang===lang);
  });
  if(typeof refreshMapLabels === "function") refreshMapLabels();
}

document.getElementById("langSwitch").addEventListener("click", e=>{
  const btn = e.target.closest(".lang-btn");
  if(btn) applyLang(btn.dataset.lang);
});

applyLang(currentLang);

/* ===================== Mobile nav ===================== */
const burger = document.getElementById("burger");
const mainNav = document.getElementById("mainNav");
burger.addEventListener("click", ()=>{
  mainNav.classList.toggle("nav-open");
});
mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>mainNav.classList.remove("nav-open")));

/* ===================== "How it works" scroll progress ===================== */
const lineDiagram = document.querySelector(".line-diagram");
const lineFill = document.getElementById("lineFill");
if(lineDiagram && lineFill){
  const onScroll = ()=>{
    const rect = lineDiagram.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const visible = Math.min(Math.max(vh*0.8 - rect.top, 0), total);
    const pct = total>0 ? Math.min(100, (visible/total)*100) : 0;
    lineFill.style.height = pct + "%";
  };
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();
}

/* ===================== Barcode generator ===================== */
function renderBarcode(container, code){
  container.innerHTML = "";
  // deterministic pseudo-random bar widths seeded from the code string
  let seed = 0;
  for(let i=0;i<code.length;i++) seed = (seed*31 + code.charCodeAt(i)) % 100000;
  const rand = ()=>{ seed = (seed*9301+49297)%233280; return seed/233280; };
  const bars = 46;
  for(let i=0;i<bars;i++){
    const w = 1 + Math.floor(rand()*3);
    const gap = rand() > 0.5;
    const bar = document.createElement("span");
    bar.style.width = w+"px";
    bar.style.opacity = gap ? "0.15" : "1";
    container.appendChild(bar);
  }
}

/* ===================== Order form ===================== */
const orderForm = document.getElementById("orderForm");
const orderEmpty = document.getElementById("orderEmpty");
const ticket = document.getElementById("ticket");

orderForm.addEventListener("submit", e=>{
  e.preventDefault();
  const fromSel = document.getElementById("orderFrom");
  const toSel = document.getElementById("orderTo");
  const from = fromSel.options[fromSel.selectedIndex].textContent;
  const to = toSel.options[toSel.selectedIndex].textContent;

  const code = "NR-" + Math.floor(100000 + Math.random()*899999);
  document.getElementById("ticketCode").textContent = code;
  document.getElementById("ticketFrom").textContent = from;
  document.getElementById("ticketTo").textContent = to;
  renderBarcode(document.getElementById("barcode"), code);

  orderEmpty.hidden = true;
  ticket.hidden = false;
});

/* ===================== Geolocation: nearest pickup point ===================== */
const pickupPoints = [
  {name:"ПВЗ №1 — ЖК Alatau City", lat:43.238, lng:76.945},
  {name:"ПВЗ №2 — ЖК Highvill", lat:43.222, lng:76.851},
  {name:"ПВЗ №3 — Центральная площадь", lat:43.256, lng:76.928},
  {name:"ПВЗ №4 — ЖК Botanic City", lat:43.201, lng:76.879}
];

function haversine(lat1,lon1,lat2,lon2){
  const R=6371, toRad = d=>d*Math.PI/180;
  const dLat = toRad(lat2-lat1), dLon = toRad(lon2-lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

const geoBtn = document.getElementById("geoBtn");
const geoResult = document.getElementById("geoResult");
const geoMessages = {
  ru:{seeking:"Определяем геолокацию…", denied:"Доступ к геолокации не разрешён.", unsupported:"Геолокация не поддерживается браузером.", found:d=>`Ближайший пункт: ${d.name} — ${d.dist.toFixed(1)} км от вас`},
  kk:{seeking:"Геолокация анықталуда…", denied:"Геолокацияға рұқсат берілмеді.", unsupported:"Браузер геолокацияны қолдамайды.", found:d=>`Ең жақын пункт: ${d.name} — сізден ${d.dist.toFixed(1)} км`},
  en:{seeking:"Locating you…", denied:"Location access denied.", unsupported:"Geolocation isn't supported by this browser.", found:d=>`Nearest point: ${d.name} — ${d.dist.toFixed(1)} km away`}
};

geoBtn.addEventListener("click", ()=>{
  const msgs = geoMessages[currentLang];
  if(!navigator.geolocation){
    geoResult.textContent = msgs.unsupported;
    return;
  }
  geoResult.textContent = msgs.seeking;
  navigator.geolocation.getCurrentPosition(pos=>{
    const {latitude, longitude} = pos.coords;
    let nearest = null, best = Infinity;
    pickupPoints.forEach(p=>{
      const d = haversine(latitude, longitude, p.lat, p.lng);
      if(d < best){ best = d; nearest = p; }
    });
    geoResult.textContent = msgs.found({name:nearest.name, dist:best});
  }, ()=>{
    geoResult.textContent = msgs.denied;
  });
});

/* ===================== Scroll reveal ===================== */
const revealTargets = document.querySelectorAll(
  ".section-head, .problem-card, .line-stop, .feature-pill, .order-panel, .track-panel, .map-shell, .point-card, .team-copy, .team-achieve"
);
revealTargets.forEach((el,i)=>{
  el.classList.add("reveal","reveal-stagger");
  el.style.setProperty("--stagger", i % 6);
});
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.15, rootMargin:"0px 0px -60px 0px"});
revealTargets.forEach(el=>revealObserver.observe(el));

/* ===================== Live city map (self-contained, no network needed) ===================== */
// x/y are percentages over the map's SVG viewbox, matching the illustrated streets
const cityLocations = [
  {type:"warehouse", x:11, y:78, name:"Склад NovaRescue"},
  {type:"cafe", x:33, y:50, name:"Кафе «Дастархан»"},
  {type:"cafe", x:54, y:44, name:"Аптека «Europharma»"},
  {type:"cafe", x:76, y:32, name:"Магазин «QazTech»"},
  {type:"cafe", x:90, y:19, name:"Кофейня «Шыгыс»"},
  {type:"admin", x:63, y:22, name:"Городская администрация"},
  {type:"admin", x:44, y:63, name:"Районный акимат"},
  {type:"point", x:20, y:83, name:"ПВЗ №1 — ЖК Alatau City"},
  {type:"point", x:37, y:31, name:"ПВЗ №2 — ЖК Highvill"},
  {type:"point", x:66, y:27, name:"ПВЗ №3 — Центральная площадь"},
  {type:"point", x:90, y:11, name:"ПВЗ №4 — ЖК Botanic City"}
];

const pinIcons = {
  warehouse:'<path d="M3 10l9-6 9 6v9a1 1 0 01-1 1h-4v-6H8v6H4a1 1 0 01-1-1z" fill="#0A0A14"/>',
  cafe:'<path d="M5 3h11v8a5 5 0 01-5 5H10a5 5 0 01-5-5V3z" fill="#0A0A14"/><path d="M16 6h1.5a2.5 2.5 0 010 5H16" stroke="#0A0A14" stroke-width="1.6" fill="none"/>',
  admin:'<path d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-6h6v6" stroke="#0A0A14" stroke-width="1.6" fill="none"/>',
  point:'<path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z" fill="#0A0A14"/>'
};

function typeLabel(type){
  const key = "map.type" + type.charAt(0).toUpperCase() + type.slice(1);
  return translations[currentLang][key] || type;
}

function initCityMap(){
  const pinLayer = document.getElementById("mapPins");
  const tooltip = document.getElementById("mapTooltip");
  if(!pinLayer || pinLayer.dataset.built) return;
  pinLayer.dataset.built = "1";

  cityLocations.forEach(loc=>{
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `map-pin pin-${loc.type}`;
    btn.style.left = loc.x + "%";
    btn.style.top = loc.y + "%";
    btn.innerHTML = `<svg viewBox="0 0 24 24">${pinIcons[loc.type]}</svg>`;
    btn.setAttribute("aria-label", loc.name);
    btn._nrLoc = loc;

    const show = ()=>{
      tooltip.innerHTML = `<b>${loc.name}</b><span>${typeLabel(loc.type)}</span>`;
      tooltip.style.left = loc.x + "%";
      tooltip.style.top = loc.y + "%";
      tooltip.hidden = false;
    };
    const hide = ()=>{ tooltip.hidden = true; };

    btn.addEventListener("mouseenter", show);
    btn.addEventListener("focus", show);
    btn.addEventListener("mouseleave", hide);
    btn.addEventListener("blur", hide);
    btn.addEventListener("click", show);

    pinLayer.appendChild(btn);
  });
}

function refreshMapLabels(){
  // tooltip content is generated on demand from typeLabel(), nothing to pre-refresh
}

if("IntersectionObserver" in window){
  const mapSection = document.getElementById("map");
  const mapInitObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        initCityMap();
        mapInitObserver.disconnect();
      }
    });
  }, {threshold:0.1});
  if(mapSection) mapInitObserver.observe(mapSection);
} else {
  window.addEventListener("load", initCityMap);
}
// Safety net: build the map on load regardless, in case the section is already visible
window.addEventListener("DOMContentLoaded", initCityMap);

/* ===================== Track form ===================== */
const trackForm = document.getElementById("trackForm");
const tlSteps = document.querySelectorAll(".tl-step");
trackForm.addEventListener("submit", e=>{
  e.preventDefault();
  const val = document.getElementById("trackInput").value.trim();
  // deterministic mock progress based on code contents
  let sum = 0;
  for(let i=0;i<val.length;i++) sum += val.charCodeAt(i);
  const activeCount = val ? 1 + (sum % 4) : 2;
  tlSteps.forEach((step, i)=>{
    step.classList.toggle("active", i < activeCount);
  });
});
