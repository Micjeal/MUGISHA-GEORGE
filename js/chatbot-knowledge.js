// Chatbot Knowledge Base - Comprehensive Q&A for Mugisha & Family Super Tailors
const chatbotKnowledge = {
    // Website Information
    'website_purpose': {
        en: 'This website serves as the digital storefront for Mugisha & Family Super Tailors, showcasing our tailoring services, school uniform partnerships, and connecting with customers. You can browse our services, view our work, and get in touch with us.',
        lg: 'Olupapula luno lwa ku nterineti lwa Mugisha & Family Super Tailors, lwa kweyoleza enkola zaffe z\'okukola engoye, okukolagana n\'abasomesa, n\'okukwatagana n\'abakiriisa. Osobola okulaba ebikolwa byaffe, engoye zaffe, n\'okwetuukiriza.',
        sw: 'Tovuti hii ni duka la kidijitali la Mugisha & Family Super Tailors, inayoonyesha huduma zetu za ushonaji, ushirikiano wa sare za shule, na kuunganisha na wateja. Unaweza kuvinjari huduma zetu, kutazama kazi zetu, na kuwasiliana nasi.',
        fr: 'Ce site web sert de vitrine numérique pour Mugisha & Family Super Tailors, présentant nos services de couture, nos partenariats pour les uniformes scolaires et permettant de nous contacter. Vous pouvez parcourir nos services, voir nos réalisations et nous contacter.'
    },
    'owner': {
        en: 'Mugisha & Family Super Tailors is a family-owned business founded by Mr. Mugisha and his family. With over 15 years of experience in the tailoring industry, the Mugisha family is dedicated to providing high-quality, custom-tailored clothing to the Kabwohe community and beyond.',
        lg: 'Mugisha & Family Super Tailors kizimbe ky\'omulimi omukadde Mugisha n\'abanne. N\'emyaka esinga 15 gye bakolera mu kukola engoye, ab\'omulimi Mugisha baagadde okuteekateeka engoye ez\'ekitiibwa mu kitundu kya Kabwohe n\'ebweru wakyo.',
        sw: 'Mugisha & Family Super Tailors ni biashara ya familia iliyoanzishwa na Bw. Mugisha na familia yake. Kwa uzoefu wa zaidi ya miaka 15 katika tasnia ya ushonaji, familia ya Mugisha imejitolea kutoa mavazi ya hali ya juu, yaliyoshonwa kwa makini kwa jamii ya Kabwohe na maeneo jirani.',
        fr: 'Mugisha & Family Super Tailors est une entreprise familiale fondée par M. Mugisha et sa famille. Avec plus de 15 ans d\'expérience dans l\'industrie de la couture, la famille Mugisha se consacre à fournir des vêtements sur mesure de haute qualité à la communauté de Kabwohe et au-delà.'
    },
    // Company Information
    'company_name': {
        en: 'Our company is called Mugisha & Family Super Tailors, and we are a family-owned tailoring business based in Kabwohe, Uganda. We specialize in high-quality custom tailoring, school uniforms, and traditional African attire.',
        lg: 'Ekitongole kyaffe kiyitibwa Mugisha & Family Super Tailors, era tuli omulimi gw\'omukadde ogukola engoye ez\'ekitiibwa mu Kabwohe, Uganda. Tukola enkola y\'engoye ez\'ekitiibwa, engoye z\'abasomesa, n\'eby\'okwambalira eby\'obuganda.',
        sw: 'Kampuni yetu inaitwa Mugisha & Family Super Tailors, na sisi ni biashara ya familia inayoshona mavazi ya hali ya juu huko Kabwohe, Uganda. Tunajishughulisha hasa na ushonaji wa mavazi ya hali ya juu, sare za shule, na mavazi ya kitamaduni ya Kiafrika.',
        fr: 'Notre entreprise s\'appelle Mugisha & Family Super Tailors, et nous sommes une entreprise familiale de couture basée à Kabwohe, en Ouganda. Nous sommes spécialisés dans la couture sur mesure de haute qualité, les uniformes scolaires et les vêtements traditionnels africains.'
    },
    'company_name_short': {
        en: 'Mugisha Tailors',
        lg: 'Mugisha Abakola Engoye',
        sw: 'Washonaji wa Mugisha',
        fr: 'Tailleurs Mugisha'
    },
    'company_name_full': {
        en: 'Mugisha & Family Super Tailors',
        lg: 'Mugisha & Family Super Abakola Engoye',
        sw: 'Mugisha & Familia Wasonaji Bora',
        fr: 'Super Tailleurs Mugisha & Famille'
    },

    // Greetings and Basic Info
    'greeting': {
        en: 'Hello! Welcome to Mugisha & Family Super Tailors. How can I assist you today?',
        lg: 'Nkulamusizza! Tuyambe ku Mugisha & Family Super Tailors. Nsobola okukuyamba bintu ki leero?',
        sw: 'Hujambo! Karibu kwa Mugisha & Family Super Tailors. Naweza kukusaidia nini leo?',
        fr: 'Bonjour! Bienvenue chez Mugisha & Family Super Tailors. Comment puis-je vous aider aujourd\'hui?'
    },
    'who_are_you': {
        en: 'I am your virtual assistant for Mugisha & Family Super Tailors, your trusted family-owned tailoring business in Kabwohe. I\'m here to help you with any questions about our tailoring services, school uniforms, custom designs, and more.',
        lg: 'Ndi omuyambi wammwe omukyala wa Mugisha & Family Super Tailors, omulimi gw\'omukadde gwe tukkiriza mu Kabwohe. Ndi wano okukuyambako ku byonna ebikwata ku byo tukola, nga by\'engoye z\'abasomesa, enkola empya, n\'ebirala.',
        sw: 'Mimi ni msaidizi wako wa kipekee wa Mugisha & Family Super Tailors, biashara ya familia inayoshona mavazi ya hali ya juu hapa Kabwohe. Nipo hapa kukusaidia kwa maswali yoyote kuhusu huduma zetu za ushonaji, sare za shule, miundo maalum, na zaidi.',
        fr: 'Je suis votre assistant virtuel pour Mugisha & Family Super Tailors, votre entreprise familiale de couture de confiance à Kabwohe. Je suis là pour vous aider avec toutes vos questions sur nos services de couture, uniformes scolaires, créations sur mesure, et plus encore.'
    },
    'working_hours': {
        en: 'We are open from Monday to Saturday, 8:00 AM to 7:00 PM. We are closed on Sundays and public holidays.',
        lg: 'Tulikolera ku Lwokubiri okutuuka ku Lwamukaaga, okuva ku ssaawa munaana (8:00) ku nkya okutuuka ku ssaawa musanvu (7:00) ekiro. Tetukola ku Ssande n\'enkozesa y\'ensi.',
        sw: 'Tunafunguliwa kutoka Jumatatu hadi Jumamosi, saa 8:00 asubuhi hadi saa 7:00 jioni. Hatifunguli Jumapili na siku za sikukuu.',
        fr: 'Nous sommes ouverts du lundi au samedi, de 8h00 à 19h00. Nous sommes fermés les dimanches et jours fériés.'
    },
    'location': {
        en: 'We are located in the heart of Kabwohe Town, Uganda, along the Mbarara-Kabale Highway. Our shop is easily accessible, just 100 meters from the central market. You can find us at:\n\n📍 Plot 42, Mbarara-Kabale Road\nKabwohe Town, Sheema District\nWestern Region, Uganda\n\nYou can view our location on Google Maps: [Click here for directions](https://www.google.com/maps/place/Kabwohe,+Uganda/@-0.5700,30.4150,15z). We\'re open Monday to Saturday, 8:00 AM to 7:00 PM.',
        lg: 'Tuli mu kitundu ky\'e Kabwohe, mu Uganda, ku muguwa omukulu ogw\'e Mbarara-Kabale. Dduuka lyaffe liri wala metta 100 okuva ku katale akakulu. Otusangayo ku:\n\n📍 Ploti 42, Mbarara-Kabale Road\nKabwohe Town, Disitulikiti ya Sheema\nBugwanjuba bwa Uganda\n\nOsobola okulaba ekitundu kyaffe ku Google Maps: [Nyiga wano okulaba engeri y\'otunyiikira](https://www.google.com/maps/place/Kabwohe,+Uganda/@-0.5700,30.4150,15z). Tuli wano ku Lwokubiri okutuuka ku Lwamukaaga, okuva ku ssaawa munaana (8:00) ku nkya okutuuka ku ssaawa musanvu (7:00) ekiro.',
        sw: 'Tupo katikati ya Mji wa Kabwohe, Uganda, kando ya Barabara Kuu ya Mbarara-Kabale. Duka letu lipatikana kwa urahisi, meta 100 tu kutoka soko kuu. Unaweza kutupata hapa:\n\n📍 Ploti 42, Barabara ya Mbarara-Kabale\nMji wa Kabwohe, Wilaya ya Sheema\nMkoa wa Magharibi, Uganda\n\nUnaweza kuona eneo letu kwenye Ramani ya Google: [Bonyeza hapa kwa maelekezo](https://www.google.com/maps/place/Kabwohe,+Uganda/@-0.5700,30.4150,15z). Tuna fungua Jumatatu hadi Jumamosi, saa 8:00 asubuhi hadi saa 7:00 jioni.',
        fr: 'Nous sommes situés au cœur de la ville de Kabwohe, en Ouganda, le long de l\'autoroute Mbarara-Kabale. Notre magasin est facilement accessible, à seulement 100 mètres du marché central. Vous pouvez nous trouver à l\'adresse suivante :\n\n📍 Parcelle 42, Route de Mbarara-Kabale\nVille de Kabwohe, District de Sheema\nRégion de l\'Ouest, Ouganda\n\nVous pouvez voir notre emplacement sur Google Maps : [Cliquez ici pour l\'itinéraire](https://www.google.com/maps/place/Kabwohe,+Uganda/@-0.5700,30.4150,15z). Nous sommes ouverts du lundi au samedi, de 8h00 à 19h00.'
    },
    'show_map': {
        en: 'Here\'s our location on the map. You can click the link for directions: [View on Google Maps](https://www.google.com/maps/place/Kabwohe,+Uganda/@-0.5700,30.4150,15z). Our shop is easily recognizable with our bright blue signage.',
        lg: 'Wano w\'olaba ekitundu kyaffe ku mape. Osobola okunyiga olukalala luno okulaba engeri y\'otunyiikira: [Laba ku Google Maps](https://www.google.com/maps/place/Kabwohe,+Uganda/@-0.5700,30.4150,15z). Dduuka lyaffe lisobola okulabika bulungi olw\'ebibala byalyo eby\'ekika kya bululuulu.',
        sw: 'Hapa kuna eneo letu kwenye ramani. Unaweza kubonyeza kiunga hiki kwa maelekezo: [Tazama kwenye Ramani ya Google](https://www.google.com/maps/place/Kabwohe,+Uganda/@-0.5700,30.4150,15z). Duka letu linatambulika kwa urahisi kwa alama yetu ya bluu nyangavu.',
        fr: 'Voici notre emplacement sur la carte. Vous pouvez cliquer sur le lien pour obtenir l\'itinéraire : [Voir sur Google Maps](https://www.google.com/maps/place/Kabwohe,+Uganda/@-0.5700,30.4150,15z). Notre magasin est facilement reconnaissable à son enseigne bleu vif.'
    },
    'contact': {
        en: 'You can reach us at: Phone: +256 700 123456, Email: info@mugishatailors.com',
        lg: 'Osobola okutuukako ku: Ssimu: +256 700 123456, Email: info@mugishatailors.com',
        sw: 'Unaweza kutupigia simu: +256 700 123456, Barua pepe: info@mugishatailors.com',
        fr: 'Vous pouvez nous contacter au : Téléphone : +256 700 123456, Email : info@mugishatailors.com'
    },
    'products_services': {
        en: 'We offer a comprehensive range of tailoring products and services including: \n- School Uniforms: Custom-made uniforms for all grades\n- Business Attire: Suits, shirts, trousers, and office wear\n- Traditional Wear: Gomesi, Kanzu, Kitenge, and cultural attire\n- Wedding & Special Occasion: Bridal gowns, groom suits, and bridesmaid dresses\n- Alterations & Repairs: Professional fitting and mending services\n- Custom Designs: Bring your ideas to life with our design service',
        lg: 'Tuweereza enkola z\'okukolamu engoye eziwera: \n- Engoye z\'abasomesa: Zikolebwa ku buli kkono\n- Engoye z\'ebizimbe: Suti, mashati, ebishegu, n\'eby\'okwambala ofiisi\n- Engoye z\'obuganda: Gomesi, Kanzu, Kitenge, n\'ebirala\n- Engoye z\'omukyalo: Engoye z\'abakyala abalongoosa, suti z\'abasajja, n\'ez\'abakozi\n- Okuyitiriza n\'okukomya: Okukyusa engoye zikukwate ku ngeri gye zizze\n- Ebikolwa ebipya: Tuteeke ebigendererwa byo mu nkola',
        sw: 'Tunatoa aina mbalimbali za bidhaa na huduma za ushonaji ikiwemo: \n- Sare za Shule: Zinazofanywa kwa kipimo kwa kila darasa\n- Mavazi ya Biashara: Suti, mashati, suruali, na mavazi ya ofisini\n- Mavazi ya Kitamaduni: Gomesi, Kanzu, Kitenge, na mavazi ya kitamaduni\n- Harusi na Sherehe: Mavazi ya bibi harusi, suti za bwana harusi, na mavazi ya wasichana wa harusi\n- Marekebisho na Ukarabati: Huduma za kufaa na kurekebisha mavazi\n- Miundo Maalum: Leta maoni yako na tutayafanye kuwa kweli',
        fr: 'Nous proposons une gamme complète de produits et services de couture, notamment : \n- Uniformes scolaires : Sur mesure pour tous les niveaux\n- Tenues professionnelles : Costumes, chemises, pantalons et vêtements de bureau\n- Vêtements traditionnels : Gomesi, Kanzu, Kitenge et tenues culturelles\n- Mariage et occasions spéciales : Robes de mariée, costumes de marié et robes de demoiselle d\'honneur\n- Retouches et réparations : Services professionnels d\'ajustement et de réparation\n- Créations sur mesure : Donnez vie à vos idées avec notre service de conception'
    },
    'school_uniforms': {
        en: 'We are proud partners with over 15 schools in the region, providing high-quality, durable uniforms that meet each school\'s specifications. Our uniforms are made from premium fabrics that are comfortable, easy to maintain, and designed to last. We work closely with school administrators to ensure our uniforms meet all requirements while keeping costs affordable for parents.',
        lg: 'Tuli bakolimba n\'amassomero asinga mu 15 mu kitundu, nga tubaamu engoye z\'abasomesa ez\'ekitiibwa, ezigumikiridde, era ezikolebwa ku ngeri gye zisabwa buli somero. Engoye zaffe zikolebwa mu pulangiti ezirungi, ezigumikiridde, era tezitabaganya. Tukoze n\'abatongole b\'amassomera okukakasa nti engoye zaffe zikwatagana n\'ebisabwa ate nga zisigadde mu mwenda gwa bazzadde.',
        sw: 'Tuna furaha kushirikiana na shule zaidi ya 15 katika eneo hili, kutoa sare zenye ubora wa juu, zinazodumu na kukidhi vipimo vya kila shule. Sare zetu hufanywa kwa vitambaa vya hali ya juu vinavyofaa, rahisi kuvitunza, na vilivyobuniwa kudumu. Tunaungana kwa karibu na wakurugenzi wa shule kuhakikisha sare zetu zinakidhi mahitaji yote huku zikibaki katika bei nafuu kwa wazazi.',
        fr: 'Nous sommes fiers d\'être partenaires de plus de 15 écoles de la région, fournissant des uniformes de haute qualité et durables qui répondent aux spécifications de chaque école. Nos uniformes sont fabriqués à partir de tissus haut de gamme, confortables, faciles à entretenir et conçus pour durer. Nous travaillons en étroite collaboration avec les administrateurs scolaires pour nous assurer que nos uniformes répondent à toutes les exigences tout en restant abordables pour les parents.'
    },
    'partner_schools': {
        en: 'We are proud to partner with the following schools in the Kabwohe region:\n1. Kabwohe Modern Primary School\n2. St. Peter\'s Secondary School\n3. Kabwohe Parents School\n4. St. Kizito High School\n5. Kabwohe Community School\n6. St. Mary\'s Girls School\n7. Kabwohe Demonstration School\n8. St. Joseph\'s Technical Institute\n9. Kabwohe Islamic Primary School\n10. St. Paul\'s College\n\nContact us to learn more about our school uniform partnership program.',
        lg: 'Tuyinza okukolagana n\'amassomero ag\'enjawulo mu kitundu kya Kabwohe, nga tuli n\'amassomero agasinga 15. Wano mulimu:\n1. Kabwohe Modern Primary School\n2. St. Peter\'s Secondary School\n3. Kabwohe Parents School\n4. St. Kizito High School\n5. Kabwohe Community School\n6. St. Mary\'s Girls School\n7. Kabwohe Demonstration School\n8. St. Joseph\'s Technical Institute\n9. Kabwohe Islamic Primary School\n10. St. Paul\'s College\n\nTukirizaganya n\'amassomero ku buli kiseera. Tutegeze okumanya ebisingawo ku pulogulaamu yaffe y\'okukolagana n\'amassomero.',
        sw: 'Tunafuraha kushirikiana na shule zifuatazo katika eneo la Kabwohe:\n1. Shule ya Msingi ya Kabwohe Modern\n2. Shule ya Upili ya St. Peter\'s\n3. Shule ya Wazazi ya Kabwohe\n4. Shule ya Upili ya St. Kizito\n5. Shule ya Jamii ya Kabwohe\n6. Shule ya Wasichana ya St. Mary\n7. Shule ya Maonyesho ya Kabwohe\n8. Taasisi ya Ufundi ya St. Joseph\n9. Shule ya Msingi ya Kiislamu ya Kabwohe\n10. Chuo cha St. Paul\'s\n\nWasiliana nasi kujifunza zaidi kuhusu mpango wetu wa ushirikiano wa sare za shule.',
        fr: 'Nous sommes fiers de nous associer aux écoles suivantes dans la région de Kabwohe :\n1. École primaire moderne de Kabwohe\n2. École secondaire St. Peter\'s\n3. École des parents de Kabwohe\n4. Lycée St. Kizito\n5. École communautaire de Kabwohe\n6. École des filles St. Mary\'s\n7. École de démonstration de Kabwohe\n8. Institut technique St. Joseph\n9. École primaire islamique de Kabwohe\n10. Collège St. Paul\'s\n\nContactez-nous pour en savoir plus sur notre programme de partenariat pour les uniformes scolaires.'
    },
    'custom_suits': {
        en: 'Our custom suits are handcrafted with precision using high-quality fabrics. We offer a variety of styles including single-breasted, double-breasted, and tuxedos. Schedule a fitting session today!',
        lg: 'Suti zaffe ez\'obulimba zikolebwa mu ngeri ey\'enjawulo nga zikozesebwa engoye ez\'obulungi. Tuli n\'ebika eby\'enjawulo nga single-breasted, double-breasted, n\'ebirala. Tutegeze olunaku lw\'okujjayo okutambuza!',
        sw: 'Suti zetu za kipekee hufanywa kwa ufundi kwa kutumia vitambaa vya hali ya juu. Tunatoa mitindo mbalimbali ikiwemo single-breasted, double-breasted, na tuxedo. Panga ratiba ya kupima leo!',
        fr: 'Nos costumes sur mesure sont fabriqués à la main avec précision en utilisant des tissus de haute qualité. Nous proposons une variété de styles, notamment des costumes croisés, des costumes droits et des smokings. Prenez rendez-vous pour une séance d\'essayage dès aujourd\'hui !'
    },
    'pricing': {
        en: 'Our prices vary depending on the fabric, design complexity, and urgency. Basic alterations start at 20,000 UGX, while custom suits typically range from 150,000 UGX to 500,000 UGX. School uniforms start at 35,000 UGX per set.',
        lg: 'Obudde bwaffe butandikibwamu ku kintu kyonna, okuva ku kika kya pulangiti, obunene bw\'omulimu, n\'okwanguyiriza. Kuyitiriza kwa bulijjo kutandika ku 20,000 UGX, ate suti ez\'obulimba zisobola okutuuka ku 150,000 UGX okutuuka ku 500,000 UGX. Engoye z\'abasomesa zitandika ku 35,000 UGX ku seti emu.',
        sw: 'Bei zetu hutofautiana kutegemea kitambaa, utata wa muundo, na haraka. Marekebisho ya msingi yanaanza kwa UGX 20,000, wakati suti maalum kwa kawaida huanzia UGX 150,000 hadi UGX 500,000. Sare za shule huanza kwa UGX 35,000 kwa seti moja.',
        fr: 'Nos prix varient en fonction du tissu, de la complexité du design et de l\'urgence. Les retouches de base commencent à 20 000 UGX, tandis que les costumes sur mesure coûtent généralement entre 150 000 UGX et 500 000 UGX. Les uniformes scolaires commencent à 35 000 UGX par ensemble.'
    },
    'fabric_options': {
        en: 'We offer a wide selection of high-quality fabrics including cotton, polyester, wool, linen, and blends. We can also source specific fabrics upon request.',
        lg: 'Tulina ebika bya pulangiti eby\'enjawulo eby\'obulungi, nga cotton, polyester, wool, linen, n\'ebirala. Tuyinza okukugulirako n\'ebirala bwe bityo bw\'oba oyagadde.',
        sw: 'Tunao uteuzi mpana wa vitambaa vya hali ya juu ikiwemo pamba, polyester, sufu, kitani, na mchanganyiko. Tunaweza pia kupata vitambaa maalum kwa maagizo.',
        fr: 'Nous proposons une large sélection de tissus de haute qualité, notamment coton, polyester, laine, lin et mélanges. Nous pouvons également nous procurer des tissus spécifiques sur demande.'
    },
    'delivery': {
        en: 'We offer delivery services within Kabwohe town for a small fee. For bulk orders like school uniforms, we can discuss special delivery arrangements.',
        lg: 'Tuweereza engoye mu Kabwohe ku mwenda mutono. Ku baagadde abangi nga engoye z\'abasomesa, tusobola okwogera ku ngeri y\'okubizindiriza.',
        sw: 'Tunatoa huduma ya uwasilishaji ndani ya mji wa Kabwohe kwa ada kidogo. Kwa maagizo makubwa kama sare za shule, tunaweza kujadili mipango maalum ya uwasilishaji.',
        fr: 'Nous proposons un service de livraison dans la ville de Kabwohe pour un petit supplément. Pour les commandes en gros comme les uniformes scolaires, nous pouvons discuter d\'arrangements de livraison spéciaux.'
    },
    'payment_methods': {
        en: 'We accept cash, mobile money (MTN, Airtel), and bank transfers. A 50% deposit is required for custom orders.',
        lg: 'Tukkiriza ssente, mobile money (MTN, Airtel), n\'okukyusa mu banka. Kati 50% kya ssente kyetusabwa ku by\'obulimba.',
        sw: 'Tunakilisha pesa taslimu, pesa za simu (MTN, Airtel), na malipo ya benki. Ada ya 50% inahitajika kwa maagizo maalum.',
        fr: 'Nous acceptons les espèces, la monnaie mobile (MTN, Airtel) et les virements bancaires. Un acompte de 50% est requis pour les commandes sur mesure.'
    },
    'alterations': {
        en: 'We provide professional alteration services for all types of clothing. Common alterations include hemming, taking in/letting out seams, and sleeve adjustments. Bring your garment in for a free consultation.',
        lg: 'Tukola emirimu gy\'okukyusa engoye zonna. Ebintu eby\'enjawulo bwe tubikolera: kukata ebyambalo, kugema, n\'okukyusa ebyambalo ebirala. Leeta engoye yo otufunire eby\'obujanjabi obw\'amaanyi.',
        sw: 'Tunatoa huduma ya ukarabati wa mavazi ya kila aina. Marekebisho ya kawaida ni pamoja na kushona mshipi, kufunga/kufungua mshipi, na marekebisho ya mikono. Leta nguo yako kwa ushauri wa bure.',
        fr: 'Nous proposons des services de retouches professionnels pour tous les types de vêtements. Les retouches courantes comprennent l\'ourlet, la modification des coutures et les ajustements des manches. Apportez votre vêtement pour une consultation gratuite.'
    },
    'wedding_dresses': {
        en: 'Our wedding dress collection features both traditional and modern designs. We offer custom-made wedding dresses tailored to your preferences. Schedule a consultation to discuss your dream dress!',
        lg: 'Tulina engoye z\'omukyalo ez\'enjawulo, ez\'obuganda n\'eza kisaawe. Tuyinza okukukozesa engoye gye wenyinza okwegomba. Tutegeze olunaku lw\'okujjayo okwogera ku nkofiira yo!',
        sw: 'Mkusanyiko wetu wa mavazi ya harusi una mitindo ya kitamaduni na ya kisasa. Tunatoa mavazi ya harusi ya kipekee yanayofuatilia mapendezi yako. Panga siku ya kujadili nguo yako ya ndoto!',
        fr: 'Notre collection de robes de mariée comprend des modèles traditionnels et modernes. Nous proposons des robes de mariée sur mesure adaptées à vos préférences. Prenez rendez-vous pour discuter de la robe de vos rêves !'
    },
    'traditional_attire': {
        en: 'We specialize in creating beautiful traditional Ugandan attire including Gomesi, Kanzu, and Kitenge designs. We use authentic fabrics and traditional techniques to create stunning pieces.',
        lg: 'Tukola ennyo mu kukola engoye z\'obuganda ez\'enjawulo nga Gomesi, Kanzu, n\'ebirala. Tukozesa pulangiti ez\'obulungi n\'enkola z\'obuganda okukola ebintu eby\'amalungi.',
        sw: 'Tunahodari katuni za kitamaduni za Uganda ikiwemo Gomesi, Kanzu, na miundo ya Kitenge. Tunatumia vitambaa halisi na mbinu za kitamaduni kuunda vipuri vya kuvutia.',
        fr: 'Nous sommes spécialisés dans la création de magnifiques tenues traditionnelles ougandaises, notamment des modèles Gomesi, Kanzu et Kitenge. Nous utilisons des tissus authentiques et des techniques traditionnelles pour créer des pièces époustouflantes.'
    },
    'fitting_guide': {
        en: 'For the best fit, wear similar undergarments to what you plan to wear with the garment. Bring your shoes to ensure proper length. Fitting appointments typically take 30-45 minutes.',
        lg: 'Okufuna engoye ennungi, weereza eby\'okwambala wakati w\'okutambuza. Leeta engatto zo okukakasa obugazi obulungi. Okutambuza kuba mu kiseera kya ddiini 30-45.',
        sw: 'Kwa kifaa bora, vaa nguo za ndani zinazofanana na zile utakavaa kwa nguo hiyo. Leta viatu vyako kuhakikisha urefu unaofaa. Miadi ya kupimia kwa kawaida huchukua dakika 30-45.',
        fr: 'Pour un ajustement optimal, portez des sous-vêtements similaires à ceux que vous prévoyez de porter avec le vêtement. Apportez vos chaussures pour vous assurer de la bonne longueur. Les rendez-vous d\'essayage durent généralement entre 30 et 45 minutes.'
    },
    'care_instructions': {
        en: 'To maintain your garments: Hand wash in cold water, dry clean only when specified, iron on reverse side, and store in a cool, dry place. For specific care instructions, please ask our staff.',
        lg: 'Okukuuma engoye zo: Ziwange mu mazzi amakali, ozeewo okuzikozesa obujanjabi bwa dry clean, paka pasu ku ludda olw\'ebweru, ozitembe mu kifo ekizikiza. Bw\'oba ofuna eby\'okukola ku ngeri ey\'enjawulo, gamba abakugu baffe.',
        sw: 'Kudumisha nguo zako: Fua kwa mkono kwa maji baridi, fua kwa joto la chumvi tu pale inapoelezwa, piga pasi kwa upande wa nyuma, na hifadhi mahali pazuri na kavu. Kwa maagizo maalum ya utunzaji, tafadhali ulize wafanyikazi wetu.',
        fr: 'Pour entretenir vos vêtements : Lavez à la main à l\'eau froide, nettoyage à sec uniquement si spécifié, repassez à l\'envers et rangez dans un endroit frais et sec. Pour des instructions d\'entretien spécifiques, veuillez demander à notre personnel.'
    },
    // Add more Q&A pairs as needed
};

// Export the knowledge base
if (typeof module !== 'undefined' && module.exports) {
    module.exports = chatbotKnowledge;
}
