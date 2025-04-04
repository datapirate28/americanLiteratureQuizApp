// Analytics tracking functions
function trackQuizStart(studentName, questionCount) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quiz_start', {
            'event_category': 'Quiz',
            'event_label': 'Started',
            'student_name': studentName,
            'question_count': questionCount
        });
    }
}

function trackQuizCompletion(studentName, score, totalQuestions) {
    if (typeof gtag !== 'undefined') {
        const percentage = Math.round((score / totalQuestions) * 100);
        const incorrectAnswers = totalQuestions - score;
        
        gtag('event', 'quiz_completion', {
            'event_category': 'Quiz',
            'event_label': 'Completed',
            'student_name': studentName,
            'score': score,
            'total_questions': totalQuestions,
            'percentage': percentage,
            'correct_answers': score,
            'incorrect_answers': incorrectAnswers,
            'accuracy_rate': `${percentage}%`
        });
    }
}

function trackUnitView(unitName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'unit_view', {
            'event_category': 'Study Guide',
            'event_label': unitName
        });
    }
}

let selectedQuestionCount = "all"; // Default to "all" questions

// Header scroll behavior
let lastScrollPosition = 0;
const header = document.querySelector('.logo');
let scrollTimer = null;

// Detect scroll direction and toggle header visibility
function handleScroll(event) {
    // Get the current active section
    const activeSection = document.querySelector('.section.active');
    
    if (!activeSection) return;
    
    // Get current scroll position
    const currentScrollPosition = activeSection.scrollTop;
    
    // Clear any existing timer to avoid rapid changes
    clearTimeout(scrollTimer);
    
    // Check scroll direction
    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 50) {
        // Scrolling down & past threshold
        header.classList.add('hide');
    } else if (currentScrollPosition < lastScrollPosition || currentScrollPosition <= 50) {
        // Scrolling up or at top
        header.classList.remove('hide');
    }
    
    // Store current position
    lastScrollPosition = currentScrollPosition;
    
    // Set a timeout to ensure we're not constantly showing/hiding the header during scroll
    scrollTimer = setTimeout(() => {
        if (currentScrollPosition <= 50) {
            header.classList.remove('hide');
        }
    }, 150);
}

// Initialize scroll handlers
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    // Add scroll listener to each section
    sections.forEach(section => {
        section.addEventListener('scroll', handleScroll, { passive: true });
    });
    
    // Reset header state when changing sections
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            lastScrollPosition = 0;
            header.classList.remove('hide');
        });
    });
});

// Questions Array
const allQuestions = [
    // Easy Questions (Set 1)
        {
        question: "Before the first Europeans arrived, how many different Indian languages and tribal cultures are estimated to have existed in North America?",
            options: [
            "Around 100",
            "Over 500",
            "Exactly 250",
            "Less than 50"
            ],
            correct: 1
        },
    // ... rest of your existing Unit One questions ...

  {
    question: "Which term refers to the orally transmitted myths, legends, tales, and songs of Indian cultures that form the beginning of American literature?",
                options: [
      "Written Epics",
      "Colonial Records",
      "Oral Literature",
      "Exploration Journals"
    ],
    correct: 2 // C
  },
  {
    question: "In Native American stories, what is often revered as a spiritual and physical mother?",
                options: [
      "The Ancestors",
      "The Tribal Chief",
      "Nature",
      "The Written Word"
    ],
    correct: 2 // C
  },
  {
    question: "What is the name of the creator god in a Cheyenne creation story mentioned in the text?",
                options: [
      "Coyote",
      "Quetzalcoatl",
      "Manabozho",
      "Maheo"
    ],
    correct: 3 // D
  },
  {
    question: "In the Cheyenne creation story, which creature finally succeeds in bringing up mud from the watery universe?",
                options: [
      "Snow Goose",
      "Mallard",
      "Coot",
      "Loon"
    ],
    correct: 2 // C
  },
  {
    question: "What common name for America derives from the creation story where the world is supported on a creature's back?",
                options: [
      "Eagle Land",
      "Turtle Island",
      "Bear Country",
      "Coyote Plains"
    ],
    correct: 1 // B
  },
  {
    question: "What type of short poem-songs, sometimes given in dreams, share clear imagery and subtle mood with Japanese haiku?",
                options: [
      "War Chants",
      "Vision Songs",
      "Lullabies",
      "Gambling Songs"
    ],
    correct: 1 // B
  },
  {
    question: "What is the first European language in which a record of exploration in America exists?",
                options: [
      "Spanish",
      "French",
      "English",
      "Scandinavian (Old Norse)"
    ],
    correct: 3 // D
  },
  {
    question: "Which explorer's voyage, funded by Spanish rulers, marked the first known sustained contact between the Americas and the rest of the world?",
                options: [
      "Leif Ericson",
      "Captain John Smith",
      "Christopher Columbus",
      "Thomas Hariot"
    ],
    correct: 2 // C
  },
  {
    question: "Who wrote \"A Brief and True Report of the New-Found Land of Virginia\" (1588)?",
                options: [
      "Captain John Smith",
      "William Bradford",
      "Christopher Columbus",
      "Thomas Hariot"
    ],
    correct: 3 // D
  },
  {
    question: "Captain John Smith's writings are known for the famous story involving which Indian maiden?",
                options: [
      "Sacagawea",
      "Pocahontas",
      "Malinche",
      "Minnehaha"
    ],
    correct: 1 // B
  },
  {
    question: "When did the first enslaved Africans arrive in the English colonies (Jamestown)?",
                options: [
      "1492",
      "1607",
      "1619",
      "1585"
    ],
    correct: 2 // C
  },
  {
    question: "Which group of colonists, known for their intellectualism and desire to execute God's will, settled New England?",
                options: [
      "Quakers",
      "Cavaliers",
      "Puritans",
      "Anglicans"
    ],
    correct: 2 // C
  },
  {
    question: "What was the Puritan definition of good writing?",
                options: [
      "Writing that entertained with wit and humor.",
      "Writing that accurately described the natural world.",
      "Writing that emphasized the importance of worshipping God and spiritual dangers.",
      "Writing that praised the monarchy and aristocracy."
    ],
    correct: 2 // C
  },
  {
    question: "The Pilgrims, a specific group of Puritans known as \"Separatists,\" first migrated from England to which country known for its religious tolerance?",
                options: [
      "France",
      "Spain",
      "Holland",
      "Germany"
    ],
    correct: 2 // C
  },
  {
    question: "Who was elected governor of Plymouth colony and wrote the history \"Of Plymouth Plantation\"?",
                options: [
      "John Winthrop",
      "William Bradford",
      "Cotton Mather",
      "Roger Williams"
    ],
    correct: 1 // B
  },
  {
    question: "What was the first published book of poems by an American woman?",
                options: [
      "The Day of Doom",
      "The Tenth Muse Lately Sprung Up in America",
      "Of Plymouth Plantation",
      "Magnalia Christi Americana"
    ],
    correct: 1 // B
  },
  {
    question: "Who wrote \"The Tenth Muse Lately Sprung Up in America\"?",
                options: [
      "Mary Rowlandson",
      "Anne Bradstreet",
      "Phillis Wheatley",
      "Sarah Kemble Knight"
    ],
    correct: 1 // B
  },
  {
    question: "Which New England minister and poet, born in England, sailed to New England rather than take an oath of loyalty to the Church of England?",
                options: [
      "Michael Wigglesworth",
      "Cotton Mather",
      "Edward Taylor",
      "Jonathan Edwards"
    ],
    correct: 2 // C
  },
  {
    question: "What was the title of Michael Wigglesworth's popular but terrifying long poem about Calvinistic damnation?",
                options: [
      "Sinners in the Hands of an Angry God",
      "The Day of Doom",
      "Metrical History of Christianity",
      "A Key Into the Languages of America"
    ],
    correct: 1 // B
  },
  {
    question: "Which book served as the great model of writing, belief, and conduct for the Puritans?",
                options: [
      "The Iliad",
      "The Canterbury Tales",
      "The Bible",
      "Plato's Republic"
    ],
    correct: 2 // C
  },
  {
    question: "Who was banished from Massachusetts for his views on religious tolerance and founded the Rhode Island colony?",
                options: [
      "John Winthrop",
      "Cotton Mather",
      "William Bradford",
      "Roger Williams"
    ],
    correct: 3 // D
  },
  {
    question: "The Quakers, or \"Friends,\" established which colony under William Penn?",
                options: [
      "Massachusetts",
      "Virginia",
      "Pennsylvania",
      "New York"
    ],
    correct: 2 // C
  },
  {
    question: "Which Southern colonist, known for his large library and London diaries, wrote \"History of the Dividing Line\"?",
                options: [
      "Robert Beverley",
      "William Byrd",
      "Ebenezer Cook",
      "James Oglethorpe"
    ],
    correct: 1 // B
  },
  {
    question: "Who was the first Black person in America to write an autobiography, detailing his life from West Africa to enslavement?",
                options: [
      "Jupiter Hammon",
      "Olaudah Equiano",
      "Frederick Douglass",
      "Phillis Wheatley"
    ],
    correct: 1 // B
  },
  // Intermediate Questions (Set 2)
  {
    question: "While Native American oral literature is diverse, what is a common characteristic mentioned regarding its portrayal of nature?",
                options: [
      "Nature is seen as an obstacle to overcome.",
      "Nature is depicted as inanimate and without spiritual force.",
      "Nature is revered as a spiritual and physical mother, alive with spiritual forces.",
      "Nature is primarily a backdrop for human drama."
    ],
    correct: 2 // C
  },
  {
    question: "The text compares the Native American sense of holiness in nature to which later American literary concept associated with Ralph Waldo Emerson?",
                options: [
      "Romanticism",
      "Realism",
      "The \"Over-Soul\" (Transcendentalism)",
      "Naturalism"
    ],
    correct: 2 // C
  },
  {
    question: "What type of Native American characters, like Coyote or Manabozho, might act heroically in one tale and selfishly in another, challenging simple moral categorization?",
                options: [
      "Culture Heroes",
      "Shamans",
      "Tricksters",
      "Sacred Persons"
    ],
    correct: 2 // C
  },
  {
    question: "How did Captain John Smith's accounts of the Jamestown colony differ from Thomas Hariot's account of Roanoke?",
                options: [
      "Smith's were scientifically accurate, while Hariot's were romanticized.",
      "Smith focused on religious themes, while Hariot focused on economics.",
      "Smith's accounts were considered romantic and possibly embellished, unlike Hariot's accurate report.",
      "Smith wrote in French, while Hariot wrote in English."
    ],
    correct: 2 // C
  },
   {
    question: "What dual role did earthly success often play in the mindset of Puritans?",
                options: [
      "It was seen as both a reward for hard work and a sign of potential damnation.",
      "It was valued for itself and as a sign of spiritual health or election.",
      "It indicated both worldly intelligence and separation from God.",
      "It was pursued for community status but rejected as individual achievement."
    ],
    correct: 1 // B
  },
   {
    question: "What is the significance of the \"Mayflower Compact\" as described by William Bradford?",
                options: [
      "It established the first church in Plymouth.",
      "It was the first peace treaty signed with Native Americans.",
      "It was the first document of colonial self-governance in the English New World.",
      "It outlined the economic partnership with the Virginia Company."
    ],
    correct: 2 // C
  },
  {
    question: "Anne Bradstreet's poetry, such as \"To My Dear and Loving Husband,\" often used elaborate extended metaphors, known by what literary term?",
                options: [
      "Alliteration",
      "Similes",
      "Conceits",
      "Personification"
    ],
    correct: 2 // C
  },
   {
    question: "Despite being considered the finest 17th-century poet in North America by modern critics, why was Edward Taylor's poetry not known during his lifetime?",
                options: [
      "It was destroyed in a fire.",
      "It was written in Latin, which few could read.",
      "He never published it, and it was discovered only in the 1930s.",
      "Puritan authorities suppressed its publication."
    ],
    correct: 2 // C
  },
   {
    question: "What connection does the text draw between Wigglesworth's \"The Day of Doom\" and later works like Hawthorne's \"The Scarlet Letter\" or Melville's \"Moby-Dick\"?",
                options: [
      "They all celebrate the success of the Puritan colonies.",
      "They share a focus on the beauty of the American landscape.",
      "They exhibit the dark, metaphysical, and guilt-ridden vision rooted in Puritanism.",
      "They all primarily use ballad meter."
    ],
    correct: 2 // C
  },
  {
    question: "Why did colonial writers like Edward Taylor sometimes use literary styles (like metaphysical poetry) that were already outdated in England?",
                options: [
      "They consciously rejected contemporary English styles.",
      "They received instructions from the Crown to use older forms.",
      "Isolation and lack of rapid communication/access to current books led to a time lag.",
      "They believed older styles were more pious."
    ],
    correct: 2 // C
  },
  {
    question: "Why did New England Puritans particularly identify with the ancient Jews of the Old Testament?",
                options: [
      "They shared similar agricultural practices.",
      "They both believed they were persecuted chosen people establishing God's kingdom.",
      "They both spoke Hebrew as their primary language.",
      "They admired Jewish mercantile success."
    ],
    correct: 1 // B
  },
  {
    question: "Samuel Sewall's Diary is valuable because it inadvertently records what transition in New England?",
                options: [
      "From Puritanism to Quakerism.",
      "From English rule to independence.",
      "From early strict religious life to a more worldly, mercantile period.",
      "From agrarian society to industrialization."
    ],
    correct: 2 // C
  },
   {
    question: "What characteristic often distinguished the prose written by early colonial women like Mary Rowlandson or Sarah Kemble Knight, according to the text?",
                options: [
      "It focused primarily on complex theological debates.",
      "It mimicked the epic poetry popular in England.",
      "It consisted mainly of political treatises.",
      "It often involved domestic accounts, realism, and common-sense wit."
    ],
    correct: 3 // D
  },
   {
    question: "What fundamental principle, championed by Roger Williams and still important in America today, concerns the relationship between religious institutions and government?",
                options: [
      "The establishment of a national church.",
      "The requirement for political leaders to be church members.",
      "The separation of church and state.",
      "The funding of churches through taxes."
    ],
    correct: 2 // C
  },
  {
    question: "Besides advocating religious tolerance, what was Roger Williams's stance on the land rights of Native Americans?",
                options: [
      "He believed European kings had the right to grant Indian lands to colonists.",
      "He thought Indians should sell their land cheaply to settlers.",
      "He insisted European kings had no right to grant charters because the land belonged to the Indians.",
      "He argued that unused land could be claimed by anyone."
    ],
    correct: 2 // C
  },
   {
    question: "What core belief of the Quakers made them deeply democratic and opposed to dogmatic religious authority?",
                options: [
      "Predestination",
      "The infallibility of the Pope",
      "The sacredness of the individual conscience",
      "The literal interpretation of every word in the Bible"
    ],
    correct: 2 // C
  },
  {
    question: "John Woolman's Journal is noted for its advocacy against what social injustice, making him one of the first writers on this topic?",
                options: [
      "Unfair taxation",
      "Religious persecution",
      "Slavery",
      "Lack of voting rights for women"
    ],
    correct: 2 // C
  },
  {
    question: "How did the dominant social and economic system of the Southern colonies shape its pre-revolutionary literature?",
                options: [
      "It led to literature focused on hard work, piety, and community building.",
      "It resulted in literature that was largely theological and introspective.",
      "It fostered an aristocratic, secular literature reflecting the life of the landed gentry, often focused on worldly matters.",
      "It produced primarily oral traditions similar to Native American cultures."
    ],
    correct: 2 // C
  },
   {
    question: "What literary technique is characteristic of works like \"The Sotweed Factor\" or the satire aimed at General Oglethorpe in the colonial South?",
                options: [
      "Metaphysical conceits",
      "Sentimentalism",
      "Humorous satire attacking vice or folly",
      "Allegory"
    ],
    correct: 2 // C
  },
   {
    question: "What sentiment did Olaudah Equiano express regarding his treatment by Christians after his conversion?",
                options: [
      "Gratitude for their kindness and acceptance.",
      "Confusion about their complex theological doctrines.",
      "A lament about the cruel \"Christian\" treatment he received from them.",
      "Indifference to their religious beliefs."
    ],
    correct: 2 // C
  },
  // Challenging Questions (Revised Set 3)
  {
    question: "How did diverse tribal environments (e.g., hunting vs. agricultural) affect Native American oral literature, according to the text?",
                options: [
      "Led to identical stories across all tribes.",
      "Resulted mainly in written, not oral, traditions.",
      "Caused different cultures to produce distinct narratives and traditions.",
      "Minimized the importance of nature in their stories."
    ],
    correct: 2 // C
  },
  {
    question: "The text compares Native American tricksters (like Coyote) to Greek figures (like Odysseus). What does this comparison suggest about trickster tales?",
                options: [
      "They are unique to Native American cultures.",
      "They represent a complex archetype found in respected traditions, not just an \"inferior\" side.",
      "They were directly borrowed from Greek myths.",
      "They universally represent only negative traits."
    ],
    correct: 1 // B
  },
  {
    question: "How might the Puritans' view of themselves as chosen people, like the Old Testament Jews, have influenced their actions in the New World?",
                options: [
      "It led them to adopt Native American religions immediately.",
      "It encouraged peaceful integration with all existing cultures.",
      "It likely fostered a sense of divine mandate to establish their \"New Jerusalem,\" potentially justifying conflict.",
      "It caused them to abandon their own religious beliefs."
    ],
    correct: 2 // C
  },
  {
    question: "Contrast the main motivations for settling New England versus the Southern colonies.",
                options: [
      "Both sought primarily economic gain.",
      "New Englanders sought religious freedom/God's will; Southerners were often drawn by economic opportunity.",
      "Southerners sought religious freedom; New Englanders sought economic opportunity.",
      "Both aimed to escape political conflict in England."
    ],
    correct: 1 // B
  },
  {
    question: "How did the Puritan concept of \"stewardship\" link religious belief with worldly activity?",
                options: [
      "It demanded poverty as proof of piety.",
      "It suggested furthering God's plans by advancing personal and community well-being.",
      "It separated secular business entirely from religious life.",
      "It required all profits to be given to England."
    ],
    correct: 1 // B
  },
  {
    question: "How does Bradford's realistic depiction of the Pilgrims' arrival (hardship, danger) differ from the often \"glowing\" tones found in other colonization literature mentioned?",
                options: [
      "Bradford's account is uniquely optimistic.",
      "Bradford presents a stark view, contrasting with potentially romanticized accounts.",
      "Other accounts focused only on religion, ignoring opportunities.",
      "Bradford intended to discourage future settlement."
    ],
    correct: 1 // B
  },
  {
    question: "Though colonial writers often used \"outdated\" English styles, how did isolation sometimes foster originality, as seen in Edward Taylor's poetry?",
                options: [
      "It forced them to adopt Native American styles exclusively.",
      "Older styles were inherently better.",
      "Isolation allowed unique development without pressure from fleeting trends.",
      "Printers deliberately made texts seem older."
    ],
    correct: 2 // C
  },
  {
    question: "Compare Roger Williams's interactions with Native Americans (learning languages, defending rights) with the perspective suggested by Mary Rowlandson's captivity narrative.",
                options: [
      "Both expressed uniform trust and admiration.",
      "Both viewed Native Americans solely as obstacles.",
      "Williams showed respect and engagement; Rowlandson's account fueled fear/animosity.",
      "Rowlandson sought peaceful conversion, Williams sought removal."
    ],
    correct: 2 // C
  },
  {
    question: "How do the opposing views of Jonathan Edwards (strict Calvinism) and Roger Williams (religious tolerance) reflect changes in colonial religious thought?",
                options: [
      "Calvinism remained uniformly dominant.",
      "Both views were equally popular and unopposed.",
      "They show tension between orthodoxy and emerging tolerance, with tolerance gradually strengthening.",
      "Religious debate ended after the first generation."
    ],
    correct: 2 // C
  },
  {
    question: "Contrast the focus of William Byrd's writings (plantation life, travel, society) with the typical focus of New England Puritan writers (piety, introspection).",
                options: [
      "Byrd wrote sermons; Puritans wrote secular diaries.",
      "Byrd's secular, worldly focus contrasts with the Puritans' religious introspection.",
      "Puritans focused on leisure; Byrd focused on piety.",
      "Both wrote primarily humorous satire."
    ],
    correct: 1 // B
  },
  {
    question: "Which pair correctly identifies two black writers of the Colonial Period mentioned in the text?",
                options: [
      "William Byrd / John Woolman",
      "Olaudah Equiano / Michael Wigglesworth",
      "Robert Beverley / Jupiter Hammon",
      "Olaudah Equiano / Jupiter Hammon"
    ],
    correct: 3 // D
  },
  {
    question: "What was the name of the ship that carried the Pilgrims (Separatists) to Plymouth?",
                options: [
      "Plymouth Plantation",
      "Discovery",
      "Mayflower",
      "Roanoke"
    ],
    correct: 2 // C
  },
  {
    question: "Which statement is NOT true about the Native American oral literature described in the text?",
                options: [
      "Main characters may be animals or plants.",
      "Stories often show reverence for nature.",
      "It consisted of written stories passed down through generations.",
      "Tricksters or culture heroes can be main characters."
    ],
    correct: 2 // C
  },
  {
    question: "Which work, recounting his famous voyage, was written by Christopher Columbus?",
                options: [
      "Vinland Saga",
      "History of the Indians",
      "Journal (of Plymouth Plantation)",
      "Epistola"
    ],
    correct: 3 // D
  },
  {
    question: "According to the text, what was a key feature of Puritan writing?",
                    options: [
      "Emphasis on imagination and fiction.",
      "Focus on worshipping God and spiritual dangers.",
      "Primarily humorous anecdotes.",
      "Detailed chronicles of aristocratic life."
    ],
    correct: 1 // B
  },
  {
    question: "How does the diversity within Native American oral traditions, as described in the text (e.g., Navaho vs. Acoma, Ojibwa vs. Hopi), challenge the idea of a single, monolithic \"Native American literature\"?",
                    options: [
      "It shows that written language was more common than previously thought.",
      "It highlights that different tribal cultures and environments produced distinct narratives and traditions.",
      "It suggests that European influence unified diverse tribal stories.",
      "It proves that most tribes shared identical religious beliefs despite linguistic differences."
    ],
    correct: 1 // B
  },
  {
    question: "The text points out that revered Greek figures like Odysseus and Prometheus were essentially tricksters. What is the implication of this comparison when evaluating Native American trickster figures like Coyote?",
                    options: [
      "That Greek mythology is inferior to Native American tales.",
      "That trickster figures universally represent only the amoral side of the psyche, as Jung suggested.",
      "That Native American trickster tales should not be dismissed as merely \"inferior\" but recognized as a complex archetype also present in respected Western traditions.",
      "That Native American tricksters were direct borrowings from Greek myths."
    ],
    correct: 2 // C
  },
  {
    question: "Considering the Puritans' interpretation of the Bible and their identification with the ancient Jews, how did this worldview likely influence their interactions with and perception of the New World environment and its native inhabitants?",
                    options: [
      "It encouraged peaceful coexistence and cultural exchange with all groups.",
      "It fostered a sense of chosenness and divine mandate, potentially justifying displacement and conflict as part of establishing a \"New Jerusalem.\"",
      "It led them to adopt Native American agricultural techniques without reservation.",
      "It resulted in immediate rejection of the Bible in favor of new revelations."
    ],
    correct: 1 // B
  },
  {
    question: "Contrast the primary motivations for colonization in New England versus the Southern colonies as presented in the text.",
                    options: [
      "Both regions were primarily settled for religious freedom.",
      "New England settlers sought religious freedom and to execute God's will, while Southern settlers were often drawn by economic opportunity.",
      "Southern settlers sought religious freedom, while New England settlers sought economic opportunity.",
      "Both regions were primarily motivated by escaping political turmoil in England."
    ],
    correct: 1 // B
  },
  {
    question: "How does the concept of \"stewardship\" within Puritan belief connect their religious views with the pursuit of worldly success and community well-being?",
                    options: [
      "It demanded that they give all profits directly to the Church.",
      "It suggested that God owned everything, so personal profit was sinful.",
      "It encouraged success because they believed that in advancing their own and their community's profit, they were furthering God's plans and interpreting events spiritually.",
      "It required them to live in isolated poverty to prove their piety."
    ],
    correct: 2 // C
  },
  {
    question: "William Bradford's description of the Pilgrims' arrival emphasizes hardship, danger (\"savage barbarians,\" \"fierce storms\"), and a \"wild and savage hue\". How does this contrast with the \"glowing colors\" and descriptions of \"riches and opportunity\" often found in earlier literature of exploration mentioned in the text?",
                    options: [
      "Bradford's account was uniquely positive and optimistic.",
      "Earlier accounts focused solely on religious conversion, ignoring material wealth.",
      "Bradford provides a starkly realistic and challenging view of the initial settlement experience, contrasting with promotional or romanticized exploration accounts.",
      "Bradford's description was intended to discourage further settlement."
    ],
    correct: 2 // C
  },
  {
    question: "The text notes that colonial writers were often \"imitating writing that was already out of date in England\". While this could be seen as a limitation, how did this isolation, according to the text, sometimes lead to \"rich works of striking originality,\" as exemplified by Edward Taylor?",
                    options: [
      "Lack of current models forced writers to rely entirely on Native American oral styles.",
      "Isolation allowed writers like Taylor to develop unique voices and deeply explore existing forms (like metaphysical poetry) without pressure from fleeting English trends.",
      "Outdated styles were inherently superior to newer English literary fashions.",
      "Colonial printers deliberately altered texts to make them seem older."
    ],
    correct: 1 // B
  },
  {
    question: "Compare the views and actions of Roger Williams regarding Native Americans with the sentiments expressed in Mary Rowlandson's captivity narrative.",
                    options: [
      "Both Williams and Rowlandson expressed deep admiration and trust for all Native Americans.",
      "Williams advocated for Indian rights and learned their languages, while Rowlandson's account fueled anti-Indian sentiment due to her traumatic experience.",
      "Both viewed Native Americans primarily as obstacles to be overcome for colonial expansion.",
      "Rowlandson sought to convert Indians peacefully, while Williams advocated for their removal."
    ],
    correct: 1 // B
  },
  {
    question: "Jonathan Edwards sought to defend strict Calvinism, while Roger Williams championed religious tolerance for all, including non-Christians. How do these opposing stances reflect the evolving religious landscape of colonial America as depicted in the text?",
                    options: [
      "They show that Calvinism remained uniformly dominant throughout the colonial period.",
      "They illustrate the growing tension between traditional Puritan orthodoxy (Edwards) and emerging ideals of religious freedom and tolerance (Williams), with the latter gradually gaining force.",
      "They indicate that both tolerance and strict Calvinism were equally popular and unopposed.",
      "They demonstrate that religious debate ceased entirely after the first generation of settlers."
    ],
    correct: 1 // B
  },
  {
    question: "The text describes William Byrd as a \"Renaissance man\" embodying the Southern ideal of a gentleman planter. How does his lifestyle and the focus of his writings (worldly affairs, plantation management, travel, society) contrast with the introspective, pious, and often spiritually focused diaries and writings of New England Puritans like Samuel Sewall or Anne Bradstreet?",
                    options: [
      "Byrd's writings were exclusively religious sermons, unlike the secular diaries of Puritans.",
      "Puritan writings focused on aristocratic leisure, while Byrd focused on religious introspection.",
      "Byrd's writings reflect a secular, aristocratic focus on the material world and social life, contrasting with the Puritans' emphasis on piety, introspection, and interpreting daily life through a religious lens.",
      "Both Byrd and the Puritans wrote primarily humorous satire."
    ],
    correct: 2 // C
  },
  {
    question: "How does the emergence of writers like Olaudah Equiano and Jupiter Hammon challenge a solely Eurocentric view of early American literature?",
                    options: [
      "By proving that only European colonists produced literature during this period.",
      "By demonstrating that African and African-American voices and experiences, particularly concerning enslavement and identity, were part of the colonial literary landscape.",
      "By showing that Native American oral traditions were the only non-European form of literature.",
      "By highlighting that literacy was forbidden for all non-Europeans."
    ],
    correct: 1 // B
  },
  {
    question: "The text states that Puritans did not \"draw lines of distinction between the secular and religious spheres\". How might this belief have manifested in their approach to governance, law, and daily life in colonies like Massachusetts Bay, compared to a colony founded on principles like Roger Williams's separation of church and state?",
                    options: [
      "Puritans would establish secular governments identical to Williams's Rhode Island.",
      "Puritan colonies likely integrated religious law and moral codes directly into their civil governance (theocracies), unlike Rhode Island which aimed to keep civil and religious authority separate.",
      "Both systems resulted in complete religious freedom for all inhabitants.",
      "Williams sought to create a theocracy, while the Puritans advocated for separation."
    ],
    correct: 1 // B
  },
  {
    question: "Consider the different literary forms prominent in New England (sermons, religious poetry, histories, diaries) versus the South (letters, travel journals, humorous satire, histories focused on the material world). What underlying cultural and social differences between the two regions do these literary preferences suggest?",
                    options: [
      "New England valued entertainment above all, while the South valued religious instruction.",
      "The South had higher literacy rates, leading to more diverse forms.",
      "The differences suggest New England's focus on piety, introspection, and divine providence, versus the South's emphasis on aristocratic life, social observation, and the secular world.",
      "Both regions produced identical literary forms, primarily religious poetry."
    ],
    correct: 2 // C
  },
  {
    question: "John Woolman engaged directly with Native Americans hoping to \"learn from them\", while Roger Williams created a key to their languages. How do these examples of intercultural engagement contrast with the perspectives likely found in works such as Wigglesworth's \"The Day of Doom\" or Edwards's \"Sinners in the Hands of an Angry God\"?",
                    options: [
      "Wigglesworth and Edwards also focused on learning from Native American cultures.",
      "Woolman and Williams represent a more open, humane, and learning-oriented approach to intercultural encounters, contrasting sharply with the inward-focused, judgmental, and culturally insular theology of Wigglesworth and Edwards.",
      "Woolman and Williams were primarily focused on converting Native Americans, similar to Edwards.",
      "All these figures shared an identical, hostile view towards Native Americans."
    ],
    correct: 1 // B
  },
  {
    question: "The text mentions that the \"Indian contribution to America is greater than is often believed,\" citing everyday words. Based on the descriptions of Native American oral literature's reverence for nature and the critique of European treatment of Indians by figures like Williams, what deeper, non-linguistic influences might early Native American cultures have had on later American thought, even if not always acknowledged?",
                    options: [
      "Primarily military strategies and warfare techniques.",
      "Concepts related to environmentalism, spirituality connected to nature, and perhaps ideas about democracy or governance (though governance systems varied), contrasting with European norms.",
      "Architectural styles and urban planning.",
      "Advanced metallurgical and industrial technologies."
    ],
    correct: 1 // B
  }
];

// Store unit questions
const unitOneQuestions = allQuestions;

const unitTwoQuestions = [
    // Easy Questions (Set 1)
  {
    question: "Who called Benjamin Franklin America's \"first great man of letters\"?",
            options: [
      "Thomas Jefferson",
      "Jonathan Edwards",
      "David Hume",
      "George Washington"
    ],
    correct: 2 // C. David Hume
  },
  {
    question: "What event was considered the first modern war of liberation against a colonial power?",
            options: [
      "The French Revolution",
      "The War of 1812",
      "The American Revolution (1775-1783)",
      "The English Civil War"
    ],
    correct: 2 // C. The American Revolution (1775-1783)
  },
  {
    question: "According to the text, the triumph of American independence was seen by many as a sign that America was destined for what?",
            options: [
      "Economic hardship",
      "Continued dependence on Britain",
      "Isolationism",
      "Greatness"
    ],
    correct: 3 // D. Greatness
  },
  {
    question: "What became a \"national obsession\" for Americans after the Revolution, due to dependence on English models?",
            options: [
      "The search for gold",
      "The search for a native literature",
      "Establishing new trade routes",
      "Building a powerful navy"
    ],
    correct: 1 // B. The search for a native literature
  },
  {
    question: "Which American magazine editor wrote, \"Dependence is a state of degradation fraught with disgrace...\" around 1816?",
            options: [
      "Benjamin Franklin",
      "Thomas Paine",
      "An unnamed editor",
      "Noah Webster"
    ],
    correct: 2 // C. An unnamed editor
  },
  {
    question: "Unlike military revolutions, cultural revolutions must grow from what?",
            options: [
      "Government decree",
      "Foreign influence",
      "The soil of shared experience",
      "Economic prosperity"
    ],
    correct: 2 // C. The soil of shared experience
  },
  {
    question: "Which group of writers represents the first great generation of American writers, emerging about 50 years after the Revolution?",
            options: [
      "The Hartford Wits",
      "The Transcendentalists (Emerson, Thoreau)", // Note: This option represents the group listed in the text
      "The Colonial Puritans",
      "The Beat Generation"
    ],
    correct: 1 // B. The Transcendentalists (Emerson, Thoreau)
  },
  {
    question: "What was one reason for the slow development of America's literary independence?",
            options: [
      "Lack of interest in reading",
      "Excessive imitation of English models",
      "Abundance of American publishers",
      "Strong copyright laws protecting American authors"
    ],
    correct: 1 // B. Excessive imitation of English models
  },
  {
    question: "Why were Revolutionary writers often self-conscious and unable to root their work in American sensibilities?",
            options: [
      "They preferred French literary models.",
      "They were primarily focused on scientific writing.",
      "They had grown up as English citizens with English modes of thought.",
      "They lacked sufficient education."
    ],
    correct: 2 // C. They had grown up as English citizens with English modes of thought.
  },
  {
    question: "Which English Neoclassic writers were still being imitated in America 50 years after their fame in England?",
            options: [
      "Shakespeare and Marlowe",
      "Chaucer and Milton",
      "Addison, Steele, Swift, Pope",
      "Wordsworth and Coleridge"
    ],
    correct: 2 // C. Addison, Steele, Swift, Pope
  },
  {
    question: "Why did talented and educated people in the new nation often prefer careers in politics, law, or diplomacy over writing?",
            options: [
      "Writing paid exceptionally well.",
      "These careers brought honor, glory, and financial security, while writing did not.",
      "There were too many established writers already.",
      "Literary pursuits were discouraged by the government."
    ],
    correct: 1 // B. These careers brought honor, glory, and financial security, while writing did not.
  },
  {
    question: "What major challenge did early American writers face regarding publishing?",
            options: [
      "Overly strict editors",
      "Lack of modern publishers, audience, and adequate legal protection",
      "Competition from translated foreign works",
      "Government censorship"
    ],
    correct: 1 // B. Lack of modern publishers, audience, and adequate legal protection
  },
  {
    question: "Who was a notable exception among early writers who could publish his own work because he was a printer by trade?",
            options: [
      "Washington Irving",
      "Thomas Paine",
      "Benjamin Franklin",
      "Charles Brockden Brown"
    ],
    correct: 2 // C. Benjamin Franklin
  },
  {
    question: "Who was the first American author to attempt to live solely from his writing, though he ended life in poverty?",
            options: [
      "James Fenimore Cooper",
      "Nathaniel Hawthorne",
      "Philip Freneau",
      "Charles Brockden Brown"
    ],
    correct: 3 // D. Charles Brockden Brown
  },
  {
    question: "Why did the small cultivated audience in America often prefer European authors?",
            options: [
      "European books were cheaper.",
      "American authors wrote only poetry.",
      "Out of exaggerated respect for their former colonial rulers.",
      "European works were banned in England."
    ],
    correct: 2 // C. Out of exaggerated respect for their former colonial rulers.
  },
  {
    question: "What was perhaps the clearest cause of literary stagnation due to the unauthorized reprinting of foreign books?",
            options: [
      "The high cost of paper",
      "The absence of adequate copyright laws",
      "A tax on American authors",
      "Lack of printing presses"
    ],
    correct: 1 // B. The absence of adequate copyright laws
  },
  {
    question: "How did publisher Matthew Carey obtain English books quickly for pirating?",
            options: [
      "Through official agreements with English publishers",
      "By waiting for standard shipments",
      "Using a London agent to send unbound pages or proofs on fast ships",
      "Translating them from French copies"
    ],
    correct: 2 // C. Using a London agent to send unbound pages or proofs on fast ships
  },
  {
    question: "James Fenimore Cooper's first successful book, The Spy (1821), faced what problem shortly after publication?",
            options: [
      "It was banned by the government.",
      "It received negative reviews in England.",
      "It was pirated by four different printers within a month.",
      "It failed to find an audience."
    ],
    correct: 2 // C. It was pirated by four different printers within a month.
  },
  {
    question: "What was the nationalistic intent behind the Copyright Law of 1790, drafted by Noah Webster?",
            options: [
      "To protect both American and English authors equally",
      "To encourage the printing of foreign books",
      "To protect only the work of American authors",
      "To ban the printing of any English books"
    ],
    correct: 2 // C. To protect only the work of American authors
  },
  {
    question: "The high point of literary piracy around 1815 corresponded with what?",
            options: [
      "The peak of American literary production",
      "The low point of American writing",
      "The establishment of strong copyright laws",
      "The end of the American Revolution"
    ],
    correct: 1 // B. The low point of American writing
  },
  {
    question: "The 18th-century American Enlightenment emphasized which of the following?",
            options: [
      "Tradition over rationality",
      "Monarchy over representative government",
      "Rationality, scientific inquiry, and representative government",
      "Unquestioning religious dogma"
    ],
    correct: 2 // C. Rationality, scientific inquiry, and representative government
  },
  {
    question: "Benjamin Franklin's Autobiography is known for describing his scientific scheme for what?",
            options: [
      "Achieving political power",
      "Making scientific discoveries",
      "Self-improvement using 13 virtues",
      "Becoming a successful diplomat"
    ],
    correct: 2 // C. Self-improvement using 13 virtues
  },
  {
    question: "Which book, started by Benjamin Franklin in 1732, contained useful encouragement, advice, and pithy sayings?",
            options: [
      "Common Sense",
      "The Federalist Papers",
      "Letters from an American Farmer",
      "Poor Richard's Almanack"
    ],
    correct: 3 // D. Poor Richard's Almanack
  },
  {
    question: "Hector St. John de Crèvecoeur's Letters from an American Farmer (1782) famously described America using what image?",
            options: [
      "A shining city on a hill",
      "A melting pot",
      "A vast wasteland",
      "A fractured nation"
    ],
    correct: 1 // B. A melting pot
  },
  {
    question: "What was the most popular form of political literature during the Revolution, often read aloud to excite audiences?",
            options: [
      "Novels",
      "Epic poems",
      "Pamphlets",
      "Newspapers"
    ],
    correct: 2 // C. Pamphlets
  },

  // Intermediate Questions (Set 2)
  {
    question: "What factor significantly hampered the publishing industry and financial success for early American writers?",
                    options: [
      "Competition from newspapers",
      "Lack of compelling subject matter",
      "Widespread piracy due to inadequate copyright laws",
      "High literacy rates demanding complex works"
    ],
    correct: 2 // C. Widespread piracy due to inadequate copyright laws
  },
  {
    question: "According to the text, what dual character did Benjamin Franklin embody?",
                    options: [
      "Pious Puritan and revolutionary soldier",
      "Wealthy aristocrat and poor farmer",
      "Practical, humane rationality and Enlightenment idealism",
      "English loyalist and American patriot"
    ],
    correct: 2 // C. Practical, humane rationality and Enlightenment idealism
  },
  {
    question: "What literary genre did Charles Brockden Brown develop, featuring wild settings and psychological depth?",
                    options: [
      "Transcendentalism",
      "Realism",
      "Sentimental Novel",
      "American Gothic"
    ],
    correct: 3 // D. American Gothic
  },
  {
    question: "What is the central, tragic vision in James Fenimore Cooper's work regarding the American wilderness?",
                    options: [
      "The wilderness was inherently evil and needed to be conquered.",
      "The destruction of the new Eden (wilderness) in the very act of settling it.",
      "The inability of settlers to adapt to the wilderness.",
      "The lack of resources within the wilderness."
    ],
    correct: 1 // B. The destruction of the new Eden (wilderness) in the very act of settling it.
  },
  {
    question: "Who is Natty Bumppo, Cooper's famous literary character?",
                    options: [
      "A corrupt politician",
      "A wealthy landowner from England",
      "An idealized frontiersman, embodying the \"natural aristocrat\"",
      "A Native American chief"
    ],
    correct: 2 // C. An idealized frontiersman, embodying the "natural aristocrat"
  },
  {
    question: "The Leather-Stocking Tales, Cooper's finest achievement, constitute a vast prose epic focusing on what?",
                    options: [
      "The American Revolution",
      "The life of Natty Bumppo against the backdrop of frontier America (1740-1804)",
      "The founding of the Jamestown colony",
      "The Salem Witch Trials"
    ],
    correct: 1 // B. The life of Natty Bumppo against the backdrop of frontier America (1740-1804)
  },
  {
    question: "What does Cooper's work reveal a deep tension between?",
                    options: [
      "North and South",
      "The lone individual and society, nature and culture",
      "Science and religion",
      "America and France"
    ],
    correct: 1 // B. The lone individual and society, nature and culture
  },
  {
    question: "How did Washington Irving primarily address the American setting in his work, differing from Cooper?",
                    options: [
      "By focusing only on urban landscapes",
      "By writing in a purely realistic style",
      "By importing and adapting European legends and culture",
      "By exclusively using Native American folklore"
    ],
    correct: 2 // C. By importing and adapting European legends and culture
  },
  {
    question: "Who was Phillis Wheatley?",
                    options: [
      "A prominent leader in the women's suffrage movement",
      "The first Native American novelist",
      "The first published female playwright in America",
      "The first important African-American author in the U.S., brought as a slave"
    ],
    correct: 3 // D. The first important African-American author in the U.S., brought as a slave
  },
  {
    question: "Thomas Paine's Common Sense voiced what enduring idea about America's role?",
                    options: [
      "America should remain a British colony.",
      "America's fate is separate from the rest of the world.",
      "The cause of America is largely the cause of all mankind (American exceptionalism).",
      "America should conquer European nations."
    ],
    correct: 2 // C. The cause of America is largely the cause of all mankind (American exceptionalism).
  },
  {
    question: "Why was clarity considered vital in the political writings and newspapers of the Revolutionary era?",
                    options: [
      "To confuse British spies",
      "To appeal to educated elites only",
      "To cater to the Royal Society's standards",
      "To appeal to voters in a democracy and accommodate immigrants learning English"
    ],
    correct: 3 // D. To appeal to voters in a democracy and accommodate immigrants learning English
  },
  {
    question: "What literary form exercised a \"fatal attraction\" for patriotic writers attempting to capture the Revolution's greatness, often unsuccessfully?",
                    options: [
      "Satire",
      "The Novel",
      "The Epic poem",
      "The Short Story"
    ],
    correct: 2 // C. The Epic poem
  },
  {
    question: "Timothy Dwight's The Conquest of Canaan is an example of an unsuccessful attempt at an American epic. Who did he cast as the allegorical figure for George Washington?",
                    options: [
      "Achilles",
      "King Arthur",
      "Joshua",
      "Julius Caesar"
    ],
    correct: 2 // C. Joshua
  },
  {
    question: "Why did satirical poetry, particularly the mock epic, fare better than serious verse during this period?",
                    options: [
      "It avoided political commentary.",
      "It strictly followed classical rules.",
      "It allowed poets to use natural voices and ridicule pretentiousness.",
      "It was heavily promoted by the British government."
    ],
    correct: 2 // C. It allowed poets to use natural voices and ridicule pretentiousness.
  },
  {
    question: "Which work introduced the first stereotypical \"Yankee\" character, Jonathan?",
                    options: [
      "M'Fingal",
      "Modern Chivalry",
      "The Contrast by Royall Tyler",
      "Poor Richard's Almanack"
    ],
    correct: 2 // C. The Contrast by Royall Tyler
  },
  {
    question: "How did Philip Freneau differ from the Hartford Wits?",
                    options: [
      "Freneau was a staunch loyalist.",
      "Freneau embraced democratic causes and opposed aristocratic attitudes.",
      "Freneau wrote exclusively in Latin.",
      "Freneau avoided American subjects in his poetry."
    ],
    correct: 1 // B. Freneau embraced democratic causes and opposed aristocratic attitudes.
  },
  {
    question: "What event deeply influenced Philip Freneau's poem \"The British Prison Ship\"?",
                    options: [
      "His service alongside British troops",
      "His capture and imprisonment by the British during the war",
      "A diplomatic mission to London",
      "His childhood in England"
    ],
    correct: 1 // B. His capture and imprisonment by the British during the war
  },
  {
    question: "What institution did Noah Webster famously create, besides his Spelling Book?",
                    options: [
      "The Library of Congress",
      "Harvard University",
      "An American Dictionary",
      "The National Gazette"
    ],
    correct: 2 // C. An American Dictionary
  },
  {
    question: "Who wrote the influential stories \"Rip Van Winkle\" and \"The Legend of Sleepy Hollow\"?",
                    options: [
      "James Fenimore Cooper",
      "Charles Brockden Brown",
      "Washington Irving",
      "Nathaniel Hawthorne"
    ],
    correct: 2 // C. Washington Irving
  },
  {
    question: "What is the significance of Abigail Adams's letters to her husband John Adams?",
                    options: [
      "They described battlefield strategies.",
      "They urged that women's independence be considered in the new constitution.",
      "They focused solely on domestic matters.",
      "They argued for loyalty to the British Crown."
    ],
    correct: 1 // B. They urged that women's independence be considered in the new constitution.
  },

  // Challenging / Logical Questions (Set 3)
  {
    question: "The text states, \"Cultural revolutions... must grow from the soil of shared experience.\" This implies that a national literature requires:",
                        options: [
      "Immediate government funding",
      "A period of historical development and common identity",
      "Strict adherence to foreign models",
      "Military victory as a prerequisite"
    ],
    correct: 1 // B. A period of historical development and common identity
  },
  {
    question: "The preference for pirated English best-sellers over paying American authors suggests what primary motivation for early American printers?",
                        options: [
      "Patriotism",
      "Literary taste",
      "Profit",
      "Educational advancement"
    ],
    correct: 2 // C. Profit
  },
  {
    question: "Benjamin Franklin's list of 13 virtues and his method for self-improvement blends which two influences?",
                        options: [
      "Native American traditions and French philosophy",
      "Enlightenment belief in perfectibility and Puritan self-scrutiny",
      "Aristocratic etiquette and democratic ideals",
      "Classical Greek philosophy and British empiricism"
    ],
    correct: 1 // B. Enlightenment belief in perfectibility and Puritan self-scrutiny
  },
  {
    question: "Crèvecoeur's question, \"What then is the American, this new man?\" primarily explores the theme of:",
                        options: [
      "Political structure",
      "Religious doctrine",
      "Cultural assimilation and identity formation",
      "Military strength"
    ],
    correct: 2 // C. Cultural assimilation and identity formation
  },
  {
    question: "The failure of the American epic poem during the Revolutionary era suggests:",
                        options: [
      "A lack of heroic figures in America",
      "That direct imitation of classical forms was ill-suited to the American experience",
      "That poetry was not valued in America",
      "That American poets lacked patriotism"
    ],
    correct: 1 // B. That direct imitation of classical forms was ill-suited to the American experience
  },
  {
    question: "The success of the mock epic M'Fingal, which ridiculed a Tory, indicates that audiences appreciated:",
                        options: [
      "Uncritical praise of Britain",
      "Complex philosophical arguments",
      "Politically charged satire and social commentary",
      "Sentimental tales of romance"
    ],
    correct: 2 // C. Politically charged satire and social commentary
  },
  {
    question: "Philip Freneau's reputation as the \"Poet of the American Revolution\" stems primarily from his:",
                        options: [
      "Loyalist sympathies",
      "Use of complex classical allusions",
      "Aristocratic background",
      "Passionate, democratic, and often anti-British verse"
    ],
    correct: 3 // D. Passionate, democratic, and often anti-British verse
  },
  {
    question: "Charles Brockden Brown's use of American settings and Gothic elements can be interpreted as expressing:",
                        options: [
      "Optimism about the new nation's future",
      "Deep anxieties about the new nation's social institutions and underlying fears",
      "A desire to imitate Washington Irving",
      "Complete rejection of European literary traditions"
    ],
    correct: 1 // B. Deep anxieties about the new nation's social institutions and underlying fears
  },
  {
    question: "Washington Irving's adaptation of German tales for his Hudson River stories fulfilled what need for the new nation?",
                        options: [
      "Accurate historical accounts",
      "Political propaganda",
      "Scientific treatises",
      "An imaginative sense of history and local legends"
    ],
    correct: 3 // D. An imaginative sense of history and local legends
  },
  {
    question: "Cooper's depiction of the successive waves of settlement (scouts, settlers, middle class) highlights the theme of:",
                        options: [
      "Peaceful coexistence",
      "Unchanging wilderness",
      "Inevitable displacement and cultural loss alongside progress",
      "The failure of the middle class"
    ],
    correct: 2 // C. Inevitable displacement and cultural loss alongside progress
  },
  {
    question: "Cooper's portrayal of Natty Bumppo as morally superior to the encroaching society suggests a critique of:",
                        options: [
      "Individualism",
      "The negative impacts of \"civilization\" on nature and innate goodness",
      "Native American culture",
      "The ideals of the American Revolution"
    ],
    correct: 1 // B. The negative impacts of "civilization" on nature and innate goodness
  },
  {
    question: "The irony noted in the text regarding Phillis Wheatley is that:",
                        options: [
      "She wrote poetry despite being illiterate",
      "Some of the best poetry of the period was written by an enslaved person",
      "She was more famous in England than America",
      "She refused to write about religious themes"
    ],
    correct: 1 // B. Some of the best poetry of the period was written by an enslaved person
  },
  {
    question: "Judith Sargent Murray publishing under a man's name implies what about the literary world of her time?",
                        options: [
      "Women writers were more respected than men.",
      "There were no female readers.",
      "Male pseudonyms were necessary for women to be taken seriously.",
      "Pseudonyms were uncommon."
    ],
    correct: 2 // C. Male pseudonyms were necessary for women to be taken seriously.
  },
  {
    question: "The quotation discussing dependence on a \"foreign mind\" reflects the post-Revolutionary struggle for:",
                        options: [
      "Military alliances",
      "Economic self-sufficiency",
      "Religious freedom",
      "Cultural and intellectual independence from Britain"
    ],
    correct: 3 // D. Cultural and intellectual independence from Britain
  },
  {
    question: "Why might early American writers have found it difficult to earn a living solely through writing, besides copyright issues?",
                        options: [
      "Paper was too expensive.",
      "A small domestic audience preferred European authors, and prestigious careers lay elsewhere.",
      "Printing presses were illegal.",
      "Writing was seen as exclusively a leisure activity for women."
    ],
    correct: 1 // B. A small domestic audience preferred European authors, and prestigious careers lay elsewhere.
  },
  {
    question: "The description of pirated books being rushed into print \"almost as fast as in England\" underscores the:",
                        options: [
      "Lack of printing technology in America",
      "Efficiency and ruthlessness of the pirating industry",
      "Cooperation between American and English publishers",
      "Slow pace of publishing in England"
    ],
    correct: 1 // B. Efficiency and ruthlessness of the pirating industry
  },
  {
    question: "Franklin's advice to \"Write with the learned. Pronounce with the vulgar\" suggests a prose style that is:",
                        options: [
      "Accessible yet sophisticated",
      "Exclusively academic",
      "Deliberately obscure",
      "Solely colloquial"
    ],
    correct: 0 // A. Accessible yet sophisticated
  },
  {
    question: "Cooper's status as a \"cultural relativist\" implies he believed that:",
                        options: [
      "American culture was superior to all others",
      "European culture was superior to all others",
      "Virtue and refinement were not exclusive to any single culture",
      "Native American culture was inherently flawed"
    ],
    correct: 2 // C. Virtue and refinement were not exclusive to any single culture
  },
  {
    question: "The exclusion of women and minorities from formalized cultural institutions suggests that the Revolution's ideals of liberty did not initially extend equally to all groups in practice.",
                        options: [
      "This statement is contradicted by the text.",
      "The text supports this interpretation.",
      "The text suggests formal institutions welcomed everyone.",
      "The text focuses only on male writers."
    ],
    correct: 1 // B. The text supports this interpretation.
  },
  {
    question: "The contrasting approaches of Irving (adapting European legends) and Cooper (creating American myths) represent two different strategies for:",
                        options: [
      "Achieving international fame",
      "Criticizing the American government",
      "Establishing a distinct American literary tradition",
      "Promoting British culture in America"
    ],
    correct: 2 // C. Establishing a distinct American literary tradition
  }
];

const unitThreeQuestions = [
    // Easy Questions
  {
    question: "Around what year did the Romantic movement reach America?",
                            options: [
      "1776",
      "1860",
      "1820",
      "1900"
    ],
    correct: 2 // C
  },
  {
    question: "Which literary work revolutionized English poetry 20 years before Romanticism reached America?",
                            options: [
      "Walden",
      "Leaves of Grass",
      "The Scarlet Letter",
      "Lyrical Ballads"
    ],
    correct: 3 // D
  },
  {
    question: "What major national development in America coincided with Romanticism?",
                            options: [
      "The Gold Rush",
      "The Industrial Revolution",
      "National expansion and discovery of a distinctive American voice",
      "The invention of the telegraph"
    ],
    correct: 2 // C
  },
  {
    question: "According to Romantics, what could best express universal truth?",
                            options: [
      "Science",
      "Art",
      "Mathematics",
      "Logic"
    ],
    correct: 1 // B
  },
  {
    question: "Who wrote the influential essay \"The Poet\" (1844)?",
                            options: [
      "Henry David Thoreau",
      "Walt Whitman",
      "Ralph Waldo Emerson",
      "Edgar Allan Poe"
    ],
    correct: 2 // C
  },
  {
    question: "According to Romantic theory, what were considered one?",
                            options: [
      "Mind and body",
      "Art and science",
      "Self and nature",
      "Past and present"
    ],
    correct: 2 // C
  },
  {
    question: "According to the notes in the text, what do \"macrocosm\" and \"microcosm\" represent?",
                            options: [
      "Macrocosm = Nature, Microcosm = Society",
      "Macrocosm = God, Microcosm = Devil",
      "Macrocosm = Body, Microcosm = Soul",
      "Macrocosm = Universe, Microcosm = Human"
    ],
    correct: 3 // D
  },
  {
    question: "Which term refers to an effect of beauty in grandeur, producing feelings of awe and vastness?",
                            options: [
      "The Picturesque",
      "The Sublime",
      "The Pastoral",
      "The Gothic"
    ],
    correct: 1 // B
  },
  {
    question: "Which movement was a reaction against 18th-century rationalism?",
                            options: [
      "Realism",
      "Naturalism",
      "Modernism",
      "Transcendentalism"
    ],
    correct: 3 // D
  },
  {
    question: "Transcendentalism was based on a fundamental belief in the unity of the world and what?",
                            options: [
      "Humanity",
      "Nature",
      "God",
      "Science"
    ],
    correct: 2 // C
  },
  {
    question: "What term did Transcendentalists use for the concept that all creation is essentially united?",
                            options: [
      "Self-Reliance",
      "Nature",
      "Microcosm",
      "Over-Soul"
    ],
    correct: 3 // D
  },
  {
    question: "Which small New England village was intimately connected with Transcendentalism?",
                            options: [
      "Boston",
      "Salem",
      "Concord",
      "Amherst"
    ],
    correct: 2 // C
  },
  {
    question: "Who wrote the poem \"Concord Hymn\"?",
                            options: [
      "Henry David Thoreau",
      "Walt Whitman",
      "Emily Dickinson",
      "Ralph Waldo Emerson"
    ],
    correct: 3 // D
  },
  {
    question: "What quarterly magazine did the Transcendentalists publish?",
                            options: [
      "The Atlantic Monthly",
      "The Dial",
      "North American Review",
      "Harper's Magazine"
    ],
    correct: 1 // B
  },
  {
    question: "Who was the first editor of The Dial?",
                            options: [
      "Ralph Waldo Emerson",
      "Henry David Thoreau",
      "Margaret Fuller",
      "Bronson Alcott"
    ],
    correct: 2 // C
  },
  {
    question: "Which Transcendentalist writer spent over two years living in a cabin at Walden Pond?",
                            options: [
      "Walt Whitman",
      "Ralph Waldo Emerson",
      "Nathaniel Hawthorne",
      "Henry David Thoreau"
    ],
    correct: 3 // D
  },
  {
    question: "Which work by Thoreau details his experiment in simple living?",
                            options: [
      "Civil Disobedience",
      "A Week on the Concord and Merrimack Rivers",
      "Walden; or, Life in the Woods",
      "The Maine Woods"
    ],
    correct: 2 // C
  },
  {
    question: "Thoreau's theory of passive resistance is outlined in which essay?",
                            options: [
      "Walden",
      "Walking",
      "Slavery in Massachusetts",
      "Civil Disobedience"
    ],
    correct: 3 // D
  },
  {
    question: "What was Walt Whitman's primary occupation before becoming a full-time poet?",
                            options: [
      "Teacher",
      "Lawyer",
      "Part-time carpenter",
      "Doctor"
    ],
    correct: 2 // C
  },
  {
    question: "What is the title of Walt Whitman's lifelong work of poetry, which he continually revised?",
                            options: [
      "Drum-Taps",
      "Leaves of Grass",
      "Song of Myself",
      "Democratic Vistas"
    ],
    correct: 1 // B
  },
  {
    question: "Who referred to Whitman as the poet of the \"open road\"?",
                            options: [
      "Ralph Waldo Emerson",
      "D.H. Lawrence",
      "Henry David Thoreau",
      "Matthew Arnold"
    ],
    correct: 1 // B
  },
  {
    question: "Which group of patrician, Harvard-educated writers served as literary arbiters in Boston?",
                            options: [
      "The Transcendentalists",
      "The Knickerbockers",
      "The Fireside Poets",
      "The Boston Brahmins"
    ],
    correct: 3 // D
  },
  {
    question: "Which magazine, along with the North American Review, was an influential publication associated with the Brahmins?",
                            options: [
      "The Dial",
      "The Liberator",
      "The Atlantic Monthly",
      "Godey's Lady's Book"
    ],
    correct: 2 // C
  },
  {
    question: "Who was the best-known American poet of his day and a professor at Harvard?",
                            options: [
      "James Russell Lowell",
      "Oliver Wendell Holmes",
      "Henry Wadsworth Longfellow",
      "John Greenleaf Whittier"
    ],
    correct: 2 // C
  },
  {
    question: "Who wrote the humorous work A Fable for Critics?",
                            options: [
      "Henry Wadsworth Longfellow",
      "James Russell Lowell",
      "Oliver Wendell Holmes",
      "John Greenleaf Whittier"
    ],
    correct: 1 // B
  },
  {
    question: "Emily Dickinson spent most of her life in which Massachusetts village?",
                            options: [
      "Concord",
      "Boston",
      "Salem",
      "Amherst"
    ],
    correct: 3 // D
  },

  // Intermediate Questions
  {
    question: "What important difference existed between European Romanticism and American Romanticism?",
                                options: [
      "American Romanticism focused more on classical forms.",
      "European Romanticism rejected individualism.",
      "American Romanticism coincided with national expansion and the discovery of a distinctive American voice.",
      "European Romanticism emphasized science over art."
    ],
    correct: 2 // C
  },
  {
    question: "Ralph Waldo Emerson's 1838 address at Harvard Divinity School criticized the church for what?",
                                options: [
      "Being too involved in politics",
      "Emphasizing dogma while stifling the spirit.",
      "Neglecting missionary work",
      "Not focusing enough on scripture"
    ],
    correct: 1 // B
  },
  {
    question: "Why did Emerson consciously avoid building a logical intellectual system?",
                                options: [
      "He believed logic was inferior to emotion.",
      "He lacked the philosophical training.",
      "He felt it would negate his Romantic belief in intuition and flexibility.",
      "He preferred writing poetry over philosophy."
    ],
    correct: 2 // C
  },
  {
    question: "Which essay first published Emerson's ideas on the Over-Soul and the need for a new national vision?",
                                options: [
      "Self-Reliance",
      "The American Scholar",
      "The Poet",
      "Nature"
    ],
    correct: 3 // D
  },
  {
    question: "Emerson's poem \"Brahma\" draws heavily on which religious tradition?",
                                options: [
      "Islamic Sufism",
      "Confucianism",
      "Buddhism",
      "Hinduism"
    ],
    correct: 3 // D
  },
  {
    question: "How did Henry David Thoreau maintain his independence throughout his life?",
                                options: [
      "By inheriting a large fortune",
      "By working consistently as a surveyor",
      "By reducing his needs to the simplest level and living on little money.",
      "By receiving patronage from wealthy friends"
    ],
    correct: 2 // C
  },
  {
    question: "In Walden, the detailed description of building the cabin serves as a metaphor for what?",
                                options: [
      "The taming of the American wilderness",
      "The careful construction of a human soul.",
      "The process of writing a book",
      "The economic self-sufficiency of the individual"
    ],
    correct: 1 // B
  },
  {
    question: "Thoreau criticized English literature for lacking what quality found in America?",
                                options: [
      "Emotional depth",
      "A fresh and wild strain reflecting nature itself.",
      "Proper adherence to classical forms",
      "Complex character development"
    ],
    correct: 1 // B
  },
  {
    question: "Which statement best describes Walt Whitman's view of America, as expressed in his writings?",
                                options: [
      "America was too materialistic to produce great poetry.",
      "America's poetic nature was inferior to Europe's.",
      "The United States itself is essentially the greatest poem.",
      "American democracy was incompatible with true art."
    ],
    correct: 2 // C
  },
  {
    question: "In \"Democratic Vistas,\" what did Whitman criticize about America during the Gilded Age?",
                                options: [
      "Its lack of international influence",
      "Its overemphasis on agrarian life",
      "Its superficial wealth masking a poverty of soul.",
      "Its failure to expand westward"
    ],
    correct: 2 // C
  },
  {
    question: "What was the overall conservative effect of the Brahmin poets' focus on European traditions?",
                                options: [
      "It encouraged greater experimentation in American writing.",
      "It led to a fusion of American and Native American themes.",
      "It retarded the growth of a distinctive American consciousness.",
      "It promoted the inclusion of more diverse voices in literature."
    ],
    correct: 2 // C
  },
  {
    question: "James Russell Lowell used dialect poetry in The Biglow Papers for what purpose?",
                                options: [
      "To mock the uneducated rural population",
      "To argue for social and political reform.",
      "To preserve traditional folk tales",
      "To experiment with new poetic meters"
    ],
    correct: 1 // B
  },
  {
    question: "John Greenleaf Whittier's poem \"Snow-Bound\" is best described as:",
                                options: [
      "A political satire criticizing the government",
      "A narrative poem about a historical battle",
      "A celebration of industrial progress",
      "An elegy for the dead and a hymn affirming spirit, memory, and nature."
    ],
    correct: 3 // D
  },
  {
    question: "Margaret Fuller's Woman in the Nineteenth Century is significant because it was:",
                                options: [
      "The first novel written by an American woman",
      "A collection of poems celebrating domesticity",
      "The earliest major American exploration of women's role in society.",
      "A critique of the Transcendentalist movement"
    ],
    correct: 2 // C
  },
  {
    question: "What quality did Margaret Fuller argue women lacked because they were taught to follow external rules?",
                                options: [
      "Compassion",
      "Intelligence",
      "Self-dependence.",
      "Piety"
    ],
    correct: 2 // C
  },
  {
    question: "Which set of influences were Emily Dickinson's primary \"teachers\"?",
                                options: [
      "Contemporary American poets",
      "French Symbolist writers",
      "The Bible, Shakespeare, and classical mythology.",
      "Transcendentalist essays and German philosophy"
    ],
    correct: 2 // C
  },
  {
    question: "Which feature is characteristic of Emily Dickinson's poetic style?",
                                options: [
      "Long, flowing lines and conventional rhyme schemes",
      "Ornate language and elaborate metaphors",
      "A terse, compressed, and often imagistic style.",
      "Strict adherence to traditional grammatical rules"
    ],
    correct: 2 // C
  },
  {
    question: "(From question.pdf) Which of the following is NOT primarily associated with American Romanticism? (Adapted from Soru 11)",
                                options: [
      "Ralph Waldo Emerson",
      "Exploration of psychological states",
      "Samuel Taylor Coleridge",
      "The concept of the sublime"
    ],
    correct: 2 // C
  },
  {
    question: "(From question.pdf) Which concept is a key feature of Romanticism? (Adapted from Soru 8)",
                                options: [
      "Objectivity",
      "Rationality",
      "Harmony",
      "Subjectivity"
    ],
    correct: 3 // D
  },
  {
    question: "(From question.pdf) Who is the author of the line \"The United States is essentially the greatest poem\"? (Adapted from Soru 21)",
                                options: [
      "Henry David Thoreau",
      "Ralph Waldo Emerson",
      "Walt Whitman",
      "Emily Dickinson"
    ],
    correct: 2 // C
  },

  // Challenging / Logical Questions
  {
    question: "How did the American context of national expansion uniquely shape its Romantic movement compared to Europe's?",
                                    options: [
      "It led to a focus on urban themes.",
      "It integrated Romanticism with a search for a national voice.",
      "It caused American Romantics to reject nature.",
      "It delayed the movement's arrival by decades."
    ],
    correct: 1 // B
  },
  {
    question: "Why might Emerson state \"The man is only half himself, the other half is his expression\"?",
                                    options: [
      "To emphasize the Romantic focus on external validation.",
      "To highlight the need for artistic outlets to achieve wholeness.",
      "To suggest humans are inherently incomplete without scientific understanding.",
      "To criticize the political suppression of free speech."
    ],
    correct: 1 // B
  },
  {
    question: "How did Transcendentalists redefine the concept of \"self\" to avoid implications of selfishness?",
                                    options: [
      "By linking self-awareness to knowledge of the universe and moral duty.",
      "By emphasizing self-sacrifice as the ultimate goal.",
      "By defining the self purely through societal roles.",
      "By promoting isolation from communal life."
    ],
    correct: 0 // A
  },
  {
    question: "What is the implied connection between the \"sublime\" in nature and American democracy in Romantic thought?",
                                    options: [
      "Both were seen as uniquely European concepts.",
      "The vastness of nature mirrored the potential of the individual common person.",
      "Both were considered threats to social order.",
      "Democracy was believed to tame the wildness of the sublime."
    ],
    correct: 1 // B
  },
  {
    question: "Why was Emerson's \"Concord Hymn,\" commemorating a battle, fitting for a Transcendentalist?",
                                    options: [
      "It celebrated military power over nature.",
      "It rejected historical events in favor of pure nature.",
      "It connected a pivotal national event to a place central to their philosophy.",
      "It focused solely on the individual soldiers' experiences."
    ],
    correct: 2 // C
  },
  {
    question: "What distinguished the Transcendentalists' approach from many European movements, according to the text?",
                                    options: [
      "Their issuance of a detailed manifesto.",
      "Their insistence on individual differences and viewpoints.",
      "Their focus on collective action over individual thought.",
      "Their rejection of nature as a source of inspiration."
    ],
    correct: 1 // B
  },
  {
    question: "Emerson's advice to substitute \"Jehovah\" for \"Brahma\" suggests what about his view of underlying spiritual truth?",
                                    options: [
      "He believed Hindu concepts were superior to Judeo-Christian ones.",
      "He prioritized precise theological accuracy above all.",
      "He saw different religious figures as representing similar universal concepts.",
      "He intended the poem purely as a literary exercise."
    ],
    correct: 2 // C
  },
  {
    question: "How does Thoreau's Walden function as an \"anti-travel book\"?",
                                    options: [
      "It discourages readers from ever leaving home.",
      "It focuses on the inner journey of self-discovery rather than physical exploration.",
      "It critiques the modes of transportation available at the time.",
      "It describes only imaginary landscapes."
    ],
    correct: 1 // B
  },
  {
    question: "Thoreau's statement \"There was need of America\" implies English literature lacked what?",
                                    options: [
      "Proper grammar and style.",
      "Representation of urban life.",
      "An authentic connection to untamed wilderness.",
      "Themes of romantic love."
    ],
    correct: 2 // C
  },
  {
    question: "How did Whitman's Leaves of Grass embody the \"American Renaissance\" ideal mentioned earlier in the text?",
                                    options: [
      "By strictly adhering to European poetic forms.",
      "By capturing a distinctive, expansive, and democratic American voice.",
      "By focusing exclusively on the colonial past.",
      "By rejecting nature in favor of industrial themes."
    ],
    correct: 1 // B
  },
  {
    question: "What inherent tension existed in the Brahmin poets' attempt to elevate American literature using European models?",
                                    options: [
      "Their democratic sympathies clashed with their aristocratic tastes.",
      "Their goal of elevation conflicted with their effect of retarding a unique American voice.",
      "Their knowledge of Europe contradicted their American birth.",
      "Their use of magazines limited their audience."
    ],
    correct: 1 // B
  },
  {
    question: "Why were the Brahmins likely \"blinded\" to the innovativeness of writers like Whitman and Thoreau?",
                                    options: [
      "They disagreed with the political views of these writers.",
      "They lacked the education to understand complex poetry.",
      "Their conservative backgrounds and focus on European forms hindered recognition of radical originality.",
      "Personal rivalries prevented objective assessment."
    ],
    correct: 2 // C
  },
  {
    question: "Lowell's Biglow Papers links which two American literary traditions?",
                                    options: [
      "Puritan sermons and Transcendental essays.",
      "Sentimental novels and Gothic tales.",
      "Native American myths and slave narratives.",
      "The colonial \"character\" tradition and 19th-century realism/regionalism."
    ],
    correct: 3 // D
  },
  {
    question: "How does Whittier's \"Snow-Bound\" serve as a \"healing hymn\" in the post-Civil War context?",
                                    options: [
      "By advocating for specific political reconciliation policies.",
      "By focusing on timeless themes of spirit, memory, and nature amidst turmoil.",
      "By celebrating military victory and national unity.",
      "By ignoring the war entirely and focusing on European legends."
    ],
    correct: 1 // B
  },
  {
    question: "Margaret Fuller's call for \"one creative energy...Let it take what form it will\" connects her feminism to which broader ideal?",
                                    options: [
      "Strict adherence to traditional gender roles.",
      "The Transcendentalist value of universal human freedom and dignity.",
      "The importance of scientific advancement.",
      "A belief in artistic censorship."
    ],
    correct: 1 // B
  },
  {
    question: "What makes Emily Dickinson a \"link\" between the Romantic era and later literary sensitivities?",
                                    options: [
      "Her public persona and engagement with contemporary politics.",
      "Her adherence to the genteel tradition of the Brahmin poets.",
      "Her radical individualism and innovative, modern-seeming style.",
      "Her focus on long narrative poems based on American history."
    ],
    correct: 2 // C
  },
  {
    question: "Dickinson's line \"Much Madness is divinest Sense - / To a discerning Eye\" challenges what societal assumption?",
                                    options: [
      "That religious faith is essential for sanity.",
      "That poets should avoid controversial topics.",
      "That conformity and majority opinion define sanity and truth.",
      "That madness is always preferable to sense."
    ],
    correct: 2 // C
  },
  {
    question: "(From question.pdf) The poem \"I'm Nobody! Who are you?\" expresses a critique of what? (Adapted from Soru ?)",
                                    options: [
      "The isolation of rural life.",
      "The nature of personal identity.",
      "The desire for public recognition and fame.",
      "The Transcendentalist movement."
    ],
    correct: 2 // C
  },
  {
    question: "Considering Thoreau's emphasis on self-sufficiency and nonconformity, why was his time at Walden Pond essential to his philosophy?",
                                    options: [
      "It proved that isolation leads to unhappiness.",
      "It allowed him to escape societal pressures and test his principles in practice.",
      "It was primarily an economic venture to sell his book.",
      "It demonstrated the superiority of communal living."
    ],
    correct: 1 // B
  },
  {
    question: "The concept of the \"Over-Soul\" is central to understanding which core tenet shared by Emerson and other Transcendentalists?",
                                    options: [
      "The importance of scientific rationalism.",
      "The inherent evil present in nature.",
      "The fundamental unity connecting God, nature, and the individual soul.",
      "The need for strict adherence to religious dogma."
    ],
    correct: 2 // C
                                    }
];

// Variables
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let studentFirstName = '';
let studentLastName = '';

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        // Reset scroll position when changing sections
        selectedSection.scrollTop = 0;
    }

    // Always show header when changing sections
    const header = document.querySelector('.logo');
    header.classList.remove('hide');
    lastScrollPosition = 0;
    
    // Update active navigation link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Find the link that called this function and mark it as active
    const activeLink = document.querySelector(`.nav-link[onclick*="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // If showing study guide, ensure it's populated
    if (sectionId === 'study-guide') {
        populateStudyGuide();
    }

    // Initialize slider if navigating to notes section
    if (sectionId === 'notes') {
        initializeSlider();
    }
    
    // Reset quiz section when navigating away
    if (sectionId !== 'quiz' && document.getElementById('quiz-content').style.display === 'block') {
        document.getElementById('quiz-content').style.display = 'none';
        document.getElementById('student-form').style.display = 'block';
        document.getElementById('results').style.display = 'none';
    }
}

// Slider functionality
function initializeSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    const sliderNav = document.querySelector('.slider-nav');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isTransitioning = false;
    const transitionDuration = 200; // Reduced to 200ms for faster transitions
    const autoSlideDuration = 700; // 0.7 seconds between slides
    const resumeDelay = 2000; // 2 seconds pause after manual interaction

    // Clear existing dots and setup
    sliderNav.innerHTML = '';
    sliderContainer.style.transition = `transform ${transitionDuration}ms ease-in-out`;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            if (!isTransitioning) {
                goToSlide(index);
                resetAutoSlide();
            }
        });
        sliderNav.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide = index;
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        
        // Reset transitioning flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, transitionDuration);
    }

    function nextSlide() {
        if (!isTransitioning) {
            goToSlide((currentSlide + 1) % totalSlides);
        }
    }

    function prevSlide() {
        if (!isTransitioning) {
            goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }
    }

    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(nextSlide, autoSlideDuration);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        setTimeout(startAutoSlide, resumeDelay);
    }

    // Touch handling with improved sensitivity
    let touchStartX = 0;
    let touchStartTime = 0;
    let isSwiping = false;

    sliderContainer.addEventListener('touchstart', e => {
        if (!isTransitioning) {
            touchStartX = e.touches[0].clientX;
            touchStartTime = Date.now();
            isSwiping = true;
            stopAutoSlide();
            
            // Remove transition during swipe for responsive feel
            sliderContainer.style.transition = 'none';
        }
    });

    sliderContainer.addEventListener('touchmove', e => {
        if (isSwiping && !isTransitioning) {
            const diff = touchStartX - e.touches[0].clientX;
            const offset = -(currentSlide * 100 + (diff / sliderContainer.offsetWidth) * 100);
            sliderContainer.style.transform = `translateX(${offset}%)`;
        }
    });

    sliderContainer.addEventListener('touchend', e => {
        if (!isSwiping) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndTime = Date.now();
        const timeDiff = touchEndTime - touchStartTime;
        const diff = touchStartX - touchEndX;
        
        // Restore transition
        sliderContainer.style.transition = `transform ${transitionDuration}ms ease-in-out`;
        
        // Calculate swipe speed and distance
        const swipeSpeed = Math.abs(diff) / timeDiff;
        const swipeThreshold = sliderContainer.offsetWidth * 0.2; // 20% of container width
        
        if (Math.abs(diff) > swipeThreshold || swipeSpeed > 0.5) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            // Return to current slide if swipe wasn't strong enough
            goToSlide(currentSlide);
        }
        
        isSwiping = false;
        resetAutoSlide();
    });

    // Button events with visual feedback
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('click', () => {
            if (!isTransitioning) {
                button === prevButton ? prevSlide() : nextSlide();
                button.style.transform = 'scale(0.95)';
                setTimeout(() => button.style.transform = '', 200);
                resetAutoSlide();
            }
        });
    });

    // Mouse hover events
    sliderContainer.addEventListener('mouseenter', () => {
        stopAutoSlide();
        // Show navigation buttons more prominently
        prevButton.style.opacity = '1';
        nextButton.style.opacity = '1';
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
        // Return buttons to default opacity
        prevButton.style.opacity = '0.7';
        nextButton.style.opacity = '0.7';
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('notes').classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoSlide();
            }
        }
    });

    // Initialize
    startAutoSlide();
}

// Study Guide Functions
function populateStudyGuide() {
    const studyGuideContent = document.getElementById('study-guide-content');
    
    // Clear existing content
    studyGuideContent.innerHTML = '';
    
    // Create header with title and description
    const header = `
        <h2 class="study-guide-title">Study Guide</h2>
        <p class="section-description">Click on any unit button below to view its questions and answers. Each unit covers a different period in American Literature.</p>
    `;
    
    // Create unit navigation with four buttons
    const unitNav = `
        <div class="unit-navigation">
            <button class="unit-btn active" id="unitOneBtn">Unit One</button>
            <button class="unit-btn" id="unitTwoBtn">Unit Two</button>
            <button class="unit-btn" id="unitThreeBtn">Unit Three</button>
            <button class="unit-btn" id="unitFourBtn">Essentials</button>
        </div>
        <div id="unit-content"></div>
    `;
    
    // Add content to the page
    studyGuideContent.innerHTML = header + unitNav;
    
    // Add event listeners to buttons
    const unitOneBtn = document.getElementById('unitOneBtn');
    const unitTwoBtn = document.getElementById('unitTwoBtn');
    const unitThreeBtn = document.getElementById('unitThreeBtn');
    const unitFourBtn = document.getElementById('unitFourBtn');
    
    if (unitOneBtn) unitOneBtn.addEventListener('click', () => showUnitQuestions('one'));
    if (unitTwoBtn) unitTwoBtn.addEventListener('click', () => showUnitQuestions('two'));
    if (unitThreeBtn) unitThreeBtn.addEventListener('click', () => showUnitQuestions('three'));
    if (unitFourBtn) unitFourBtn.addEventListener('click', () => showUnitQuestions('four'));
    
    // Show Unit One questions by default
    showUnitQuestions('one');
}

function showUnitQuestions(unit) {
    // Update active button
    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.unit-btn:nth-child(${unit === 'one' ? 1 : unit === 'two' ? 2 : unit === 'three' ? 3 : 4})`).classList.add('active');
    
    const unitContent = document.getElementById('unit-content');
    let questions;
    let unitTitle;
    
    // Determine which questions to show
    switch(unit) {
        case 'one':
            questions = unitOneQuestions;
            unitTitle = "Unit One: Colonial Period";
            break;
        case 'two':
            questions = unitTwoQuestions;
            unitTitle = "Unit Two: Revolutionary Period";
            break;
        case 'three':
            questions = unitThreeQuestions;
            unitTitle = "Unit Three: The Romantic Period";
            break;
        case 'four':
            questions = unitFourQuestions;
            unitTitle = "Essential Questions";
            break;
        default:
            questions = unitOneQuestions;
            unitTitle = "Unit One: Colonial Period";
    }
    
    // Track unit view
    trackUnitView(unitTitle);
    
    if (!questions || questions.length === 0) {
        unitContent.innerHTML = `
            <h3 class="unit-title">${unitTitle}</h3>
            <p class="unit-description">No questions available for this unit yet.</p>
        `;
        return;
    }
    
    // Create header content
    const header = `
        <h3 class="unit-title">${unitTitle}</h3>
        <p class="unit-description">Review questions and answers for ${unitTitle}:</p>
    `;
    
    // Create questions content
    let questionsContent = '';
    
    questions.forEach((question, index) => {
        const correctOptionIndex = question.correct;
        const correctOption = question.options[correctOptionIndex];
        
        questionsContent += `
            <div class="question-item">
                <div class="question-number">
                    <i class="fas fa-graduation-cap"></i> Question ${index + 1}
                </div>
                <div class="question-text">${question.question}</div>
                <ul class="options-list">
                    ${question.options.map((option, optIndex) => `
                        <li class="option-item ${optIndex === correctOptionIndex ? 'correct-answer' : ''}">
                            ${option}
                            ${optIndex === correctOptionIndex ? '<i class="fas fa-check"></i>' : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });
    
    // Update the content
    unitContent.innerHTML = header + questionsContent;
}

// Quiz Functions
function startQuiz() {
    // Get student information
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    
    // Validate inputs
    if (!firstName || !lastName) {
        alert('Please enter your first and last name.');
        return;
    }
    
    // Store student info
    studentFirstName = firstName;
    studentLastName = lastName;
    
    // Get question count
    const questionCount = document.getElementById('questionCount').value;
    selectedQuestionCount = questionCount;
    
    // Track quiz start
    trackQuizStart(`${firstName} ${lastName}`, questionCount);
    
    // Initialize quiz with selected question count
    initializeQuiz(questionCount);
    
    // Hide student form and show quiz content
    document.getElementById('student-form').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    
    // Show first question
    showQuestion();
}

function initializeQuiz(questionCount) {
    // Combine all questions from all units
    const allAvailableQuestions = [
        ...unitOneQuestions,   // Colonial Period
        ...unitTwoQuestions,   // Revolutionary Period
        ...unitThreeQuestions, // American Renaissance
        ...unitFourQuestions   // Redline Questions
    ];

    if (questionCount === "all") {
        // Include all questions if "All Questions" is selected
        currentQuestions = [...allAvailableQuestions];
    } else {
        // Otherwise, include the specified number of questions
        currentQuestions = [...allAvailableQuestions]
            .sort(() => Math.random() - 0.5) // Shuffle the questions
            .slice(0, parseInt(questionCount, 10)); // Select the desired number of questions
    }

    // Shuffle the options for each question
    currentQuestions = currentQuestions.map(question => {
        const options = [...question.options];
        const correctAnswer = question.correct;

        // Shuffle the options
        const shuffledOptions = options
            .map((option, index) => ({ option, index }))
            .sort(() => Math.random() - 0.5);

        // Find the new index of the correct answer
        const newCorrectIndex = shuffledOptions.findIndex(
            item => item.index === correctAnswer
        );

        // Return the question with shuffled options and updated correct index
        return {
            ...question,
            options: shuffledOptions.map(item => item.option),
            correct: newCorrectIndex
        };
    });

    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    answered = false; // Reset answered state for new question
    const currentQuestion = currentQuestions[currentQuestionIndex];
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    document.getElementById('questionText').textContent = currentQuestion.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    // Calculate progress
    const progressPercentage = ((currentQuestionIndex) / currentQuestions.length) * 100;
    document.getElementById('progress').style.width = `${progressPercentage}%`;
    
    // Dynamically add options with animation delay
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionElement.style.setProperty('--index', index);
        optionsContainer.appendChild(optionElement);
    });
    
    // Hide next button initially
    document.getElementById('nextBtn').style.display = 'none';
}

function selectOption(selectedIndex) {
    // If already answered, do nothing
    if (answered) return;
    
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const optionsElements = document.querySelectorAll('.option');
    
    // Mark as answered
    answered = true;
    
    // Highlight correct and wrong answers
    optionsElements.forEach((option, index) => {
        option.classList.remove('selected');
        option.style.pointerEvents = 'none'; // Prevent further selection
        
        if (index === currentQuestion.correct) {
            option.classList.add('correct');
            // Add checkmark icon to correct answer
            option.innerHTML = `${option.textContent} <i class="fas fa-check-circle" style="float: right;"></i>`;
        } 
        
        if (index === selectedIndex && selectedIndex !== currentQuestion.correct) {
            option.classList.add('wrong');
            // Add X icon to wrong answer
            option.innerHTML = `${option.textContent} <i class="fas fa-times-circle" style="float: right;"></i>`;
        }
    });
    
    // Update score if correct
    if (selectedIndex === currentQuestion.correct) {
        score++;
    }
    
    // Check if this is the last question
    if (currentQuestionIndex === currentQuestions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        
        // Create Show Results button
        const showResultsBtn = document.createElement('button');
        showResultsBtn.className = 'btn try-again-btn';
        showResultsBtn.innerHTML = '<i class="fas fa-poll"></i> Show Results';
        showResultsBtn.onclick = showResults;
        
        // Add the button to the DOM
        const questionCard = document.querySelector('.question-card');
        questionCard.appendChild(showResultsBtn);
    } else {
        // Show next button
        document.getElementById('nextBtn').style.display = 'block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showResults() {
    // Hide quiz content
    document.getElementById('quiz-content').style.display = 'none';
    
    // Show results container
    const resultsContainer = document.getElementById('results');
    resultsContainer.style.display = 'block';
    
    // Calculate scores
    const totalQuestions = currentQuestions.length;
    const incorrectAnswers = totalQuestions - score;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Update score display
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `${score}/${totalQuestions}`;
    
    // Track quiz completion with detailed metrics
    trackQuizCompletion(
        `${studentFirstName} ${studentLastName}`,
        score,
        totalQuestions
    );
    
    // Create detailed score breakdown
    const scoreBreakdown = `
        <div class="score-details">
            <div class="score-item correct">
                <i class="fas fa-check-circle"></i>
                <span>Correct: ${score}</span>
            </div>
            <div class="score-item incorrect">
                <i class="fas fa-times-circle"></i>
                <span>Incorrect: ${incorrectAnswers}</span>
            </div>
            <div class="score-item percentage">
                <i class="fas fa-percentage"></i>
                <span>Accuracy: ${percentage}%</span>
            </div>
        </div>
    `;
    
    // Update result message based on score
    const resultMessage = document.getElementById('resultMessage');
    
    if (percentage >= 90) {
        resultMessage.innerHTML = `
            <span style="color: var(--success-color);">Outstanding!</span> 
            You're mastering English Cultural History!
            ${scoreBreakdown}
        `;
        scoreDisplay.style.color = 'var(--success-color)';
    } else if (percentage >= 80) {
        resultMessage.innerHTML = `
            <span style="color: var(--success-color);">Great job!</span> 
            You have a strong grasp of the material.
            ${scoreBreakdown}
        `;
        scoreDisplay.style.color = 'var(--success-color)';
    } else if (percentage >= 70) {
        resultMessage.innerHTML = `
            <span style="color: var(--primary-color);">Good work!</span> 
            You're on the right track.
            ${scoreBreakdown}
        `;
        scoreDisplay.style.color = 'var(--primary-color)';
    } else if (percentage >= 60) {
        resultMessage.innerHTML = `
            <span style="color: var(--primary-color);">Not bad!</span> 
            A bit more study and you'll improve.
            ${scoreBreakdown}
        `;
        scoreDisplay.style.color = 'var(--primary-color)';
    } else {
        resultMessage.innerHTML = `
            <span style="color: var(--error-color);">Keep studying!</span> 
            Review the material and try again.
            ${scoreBreakdown}
        `;
        scoreDisplay.style.color = 'var(--error-color)';
    }
}

function tryAgain() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    
    // Hide results
    document.getElementById('results').style.display = 'none';
    
    // Show student form
    document.getElementById('student-form').style.display = 'block';
    document.getElementById('quiz-content').style.display = 'none';
}

// Initialize the page
window.onload = () => {
    showSection('home');
};

document.getElementById('questionCount').addEventListener('change', function () {
    console.log(`Number of Questions Selected: ${this.value}`);
});

const unitFourQuestions = [
    {
        question: "What is oral literature?",
        options: [
          "Literature written down in ancient scrolls.",
          "Stories told only by European explorers.",
          "Myths, legends, tales, and songs transmitted by speaking and listening.",
          "Poetry published in early American newspapers."
        ],
        correct: 2
      },
      {
        question: "Why was the literature diverse back in the day in America?",
        options: [
          "Because early writers came from many different European countries.",
          "Due to the influence of British literary traditions only.",
          "Because there were over 500 different Indian languages and tribal cultures with distinct traditions.",
          "As a result of the invention of the printing press."
        ],
        correct: 2
      },
      {
        question: "How is nature reflected in American Lit (specifically early Native American stories)?",
        options: [
          "Nature is depicted as a hostile force to be conquered.",
          "Nature is shown with reverence, alive and endowed with spiritual forces.",
          "Nature is only a background setting with no spiritual significance.",
          "Nature is mainly used in scientific writings of the period."
        ],
        correct: 1
      },
      {
        question: "How does this view of nature affect the lit?",
        options: [
          "It leads to stories focused solely on human conflicts.",
          "It results in main characters often being animals or plants.",
          "It makes the literature primarily scientific and factual.",
          "It causes the literature to ignore spiritual themes."
        ],
        correct: 1
      },
      {
        question: "Who are culture heroes (in Native American lit)?",
        options: [
          "European explorers like Columbus.",
          "Figures like the Ojibwa's Manabozho or the Navajo's Coyote, often tricksters.",
          "Puritan ministers establishing colonies.",
          "Kings and Queens from European history."
        ],
        correct: 1
      },
       {
        question: "Regarding trickster tales and the 'immoral side of the psyche', the book states:",
        options: [
          "This is the only valid interpretation of trickster tales.",
          "Past authorities viewed them this way, but contemporary scholars offer different views.",
          "Trickster tales are purely heroic and moral.",
          "The book does not discuss psychological interpretations."
        ],
        correct: 1
      },
      {
        question: "What are oral genres found in American Indian literature?",
        options: [
          "Only novels and short stories.",
          "Lyrics, chants, myths, fairy tales, anecdotes, incantations, riddles, proverbs, epics, and legendary histories.",
          "Political pamphlets and sermons.",
          "Scientific reports and exploration journals."
        ],
        correct: 1
      },
      {
        question: "What is literature of exploration?",
        options: [
          "Fictional novels about imaginary voyages.",
          "Poetry written by Native Americans about explorers.",
          "Early writings including colony diaries, letters, travel journals, ships' logs, and reports from explorers.",
          "Religious sermons delivered by colonists."
        ],
        correct: 2
      },
      {
        question: "Who wrote the 'Epistola'?",
        options: [
          "Leif Ericson",
          "Captain John Smith",
          "Christopher Columbus.",
          "Bartolomé de las Casas"
        ],
        correct: 2
      },
      {
        question: "What did Columbus explain in the 'Epistola'?",
        options: [
          "Instructions on how to build a colony.",
          "A critique of the Spanish monarchy.",
          "The drama of his voyage: crew's terror, near-mutiny, faked logs, and first sighting of land.",
          "Detailed scientific observations of American plants."
        ],
        correct: 2
      },
      {
        question: "What was the first English attempt at colonization mentioned?",
        options: [
          "Jamestown",
          "Plymouth",
          "Roanoke.",
          "Boston"
        ],
        correct: 2
      },
      {
        question: "Where was the Roanoke colony located?",
        options: [
          "Massachusetts",
          "Virginia",
          "Off the coast of North Carolina.",
          "Quebec"
        ],
        correct: 2
      },
      {
        question: "What was the second, more permanent English colony mentioned?",
        options: [
          "Roanoke",
          "Plymouth",
          "Jamestown.",
          "New York"
        ],
        correct: 2
      },
      {
        question: "What types of works comprised the early literature of exploration?",
        options: [
          "Primarily fictional romances and plays.",
          "Mostly religious poetry and hymns.",
          "Colony diaries, letters, travel journals, ships' logs, and reports.",
          "Only political pamphlets arguing for independence."
        ],
        correct: 2
      },
      {
        question: "Why did English become the prominent language/literature discussed?",
        options: [
          "It was the only language spoken by Native Americans.",
          "French and Spanish explorers refused to write in their own languages.",
          "England eventually took possession of the North American colonies, making its literature the best-known.",
          "All early colonists were required by law to write only in English."
        ],
        correct: 2
      },
      {
        question: "What does the 'colonial period' generally refer to in this context?",
        options: [
          "The period after the American Revolution.",
          "The time of the American Civil War.",
          "The era from early European settlements up to the American Revolution.",
          "The 20th century in America."
        ],
        correct: 2
      },
      {
        question: "What does 'self-made' mean, as exemplified by Benjamin Franklin?",
        options: [
          "Someone who inherits great wealth and status.",
          "A person educated only in European universities.",
          "Someone achieving success through their own efforts, often from humble beginnings.",
          "An author who only writes autobiographies."
        ],
        correct: 2
      },
      {
        question: "What was the Puritans' stance on religious tolerance?",
        options: [
          "They welcomed people of all faiths into their colonies from the start.",
          "They often persecuted those with different beliefs (e.g., Roger Williams, Quakers).",
          "They believed strongly in the separation of church and state for all.",
          "They primarily focused on converting Native Americans peacefully."
        ],
        correct: 1
      },
       {
        question: "How did Puritans view worldly success in relation to 'predestination'?",
        options: [
           "They believed good works alone guaranteed salvation.",
           "They thought everyone would eventually be saved.",
           "They tended to see earthly success as a possible sign of being 'elect', though it wasn't definitive proof.",
           "They focused only on missionary work."
         ],
         correct: 2
      },
      {
        question: "What is a key difference noted between Pilgrims and Puritans?",
        options: [
          "Pilgrims wanted to reform the Church; Puritans separated completely.",
          "Pilgrims were 'Separatists' who left the Church and England.",
          "Puritans were primarily farmers; Pilgrims were sailors.",
          "Pilgrims settled Jamestown; Puritans settled Roanoke."
        ],
        correct: 1
      },
      {
        question: "What was the 'first main source' or great model for Puritan writing?",
        options: [
          "Greek mythology",
          "Shakespeare's plays",
          "The Bible.",
          "English newspapers"
        ],
        correct: 2
      },
      {
        question: "Who exemplifies the 'renaissance man' ideal in the Southern colonies?",
        options: [
          "A person focused only on religious studies.",
          "An early American president like Washington.",
          "A Southern gentleman skilled in many areas (e.g., farming and classical reading).",
          "A Native American leader."
        ],
        correct: 2
      },
      {
        question: "What does 'cultural independence' mean in the context of early American literature?",
        options: [
          "Complete isolation from European influences.",
          "Developing a distinctive American voice, free from excessive dependence on English models.",
          "Political independence achieved through revolution alone.",
          "The dominance of Native American traditions in literature."
        ],
        correct: 1
      },
      {
        question: "Why was the development of a distinct American literature initially slow?",
        options: [
          "American writers refused to write in English.",
          "There was a lack of printing presses in the colonies.",
          "Lingering ties to England, imitation, lack of copyright, piracy, and challenging economic/political conditions.",
          "Native American literature was preferred by the audience."
        ],
        correct: 2
      },
      {
        question: "What ideals were central to the American Enlightenment?",
        options: [
          "Religious dogma and tradition.",
          "The monarchy and aristocracy.",
          "Rationality, justice, liberty, and equality as natural rights.",
          "The study of nature exclusively."
        ],
        correct: 2
      },
      {
        question: "What is a 'maxim' in the context of Franklin's writings?",
        options: [
          "A type of sailing ship.",
          "A short statement expressing a general truth or rule of conduct.",
          "A military rank.",
          "A form of taxation."
        ],
        correct: 1
      },
      {
        question: "Who did the book identify as defining the 'new American character' as a 'new man' from mixed origins?",
        options: [
          "Captain John Smith",
          "Cotton Mather",
          "Hector St. John de Crèvecoeur.",
          "King George III"
        ],
        correct: 2
      },
      {
        question: "How did Neoclassicism relate to expressing a new American identity?",
        options: [
          "It was the primary way Americans expressed a unique identity.",
          "Its imitation of older models often hindered a unique American expression.",
          "It focused entirely on Native American themes.",
          "It was rejected by all American writers."
        ],
        correct: 1
      },
      {
        question: "What is an 'epic hero'?",
        options: [
          "A common farmer described in realistic detail.",
          "A character in a short, humorous poem.",
          "A legendary hero whose feats are celebrated in a long, dramatic narrative poem.",
          "An author known for writing diaries."
        ],
        correct: 2
      },
      {
        question: "What does an 'epic' poem typically do?",
        options: [
          "Explain rules of grammar.",
          "Describe scientific theories.",
          "Celebrate the feats of a legendary hero in elevated language.",
          "Provide instructions for farming."
        ],
        correct: 2
      },
      {
        question: "What is a 'literary sketch,' like those by Washington Irving?",
        options: [
          "A detailed drawing.",
          "A long, formal historical account.",
          "A short piece of writing, often descriptive, elegant, and seemingly casual.",
          "A colonial legal document."
        ],
        correct: 2
      },
      {
        question: "Why is Irving's story 'Rip Van Winkle' considered important?",
        options: [
          "It was the first novel published in America.",
          "It provided an accurate historical account of the Revolution.",
          "It became American folklore, helping create an imaginative sense of history and place.",
          "It was written by the first President."
        ],
        correct: 2
      },
      {
        question: "What does Irving's 'Sketch Book' contain?",
        options: [
          "Scientific diagrams.",
          "Military strategies.",
          "Stories like 'Rip Van Winkle' that create a magical sense of place and imaginative history.",
          "Instructions on how to draw."
        ],
        correct: 2
      },
      {
        question: "What is meant by 'imaginative history' in the context of Irving's work?",
        options: [
          "History based strictly on provable facts.",
          "Giving history a living, breathing, imaginative life; recreating it.",
          "Fictional stories set in the future.",
          "History written only in poetic form."
        ],
        correct: 1
      },
      {
        question: "Who are 'frontiersmen' in Cooper's context?",
        options: [
          "Wealthy plantation owners.",
          "Harvard professors.",
          "Early settlers/explorers on the edge of colonized territory (e.g., scouts, Natty Bumppo).",
          "Politicians drafting the Constitution."
        ],
        correct: 2
      }
];



