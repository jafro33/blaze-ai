
const API_KEY="YOUR_OPENAI_API_KEY";
const chat=document.getElementById("chat");

/* ================= LOGIN ================= */

function login(){
    const name=document.getElementById("username").value.trim();
    if(!name) return;
    localStorage.setItem("jjUser",name);
    document.getElementById("login").style.display="none";
    document.getElementById("app").style.display="flex";
    updateProfile(name);
    loadChat();
}

function logout(){
    localStorage.clear();
    // clear profile
    document.getElementById('profile').innerText = '';
    location.reload();
}

function updateProfile(name){
    const prof = document.getElementById('profile');
    if(!prof) return;
    prof.innerText = name.charAt(0).toUpperCase();
}

/* ================= MEMORY ================= */

function saveChat(){
localStorage.setItem("jjChat",chat.innerHTML);
}

function loadChat(){
chat.innerHTML=localStorage.getItem("jjChat")||"";
}

/* ================= ADD MESSAGE ================= */

function addMessage(text,type){
    const msg=document.createElement("div");
    msg.className="msg "+type;
    msg.innerText=text;

    chat.appendChild(msg);
    chat.scrollTop=chat.scrollHeight;
    saveChat();
}

// animate bot response typing like ChatGPT with cursor effect
function addMessageAnimated(text){
    const msg=document.createElement("div");
    msg.className="msg bot bot-message"; // bot-message adds CSS typing animation
    chat.appendChild(msg);
    chat.scrollTop=chat.scrollHeight;

    let i=0;
    const interval=setInterval(()=>{
        msg.innerText+=text.charAt(i);
        i++;
        chat.scrollTop=chat.scrollHeight;
        if(i>=text.length){
            clearInterval(interval);
            msg.classList.remove('bot-message'); // stop width animation
            saveChat();
        }
    },30); // adjust speed as desired
}


/* ================= SUGGESTION ================= */

function fill(text){
document.getElementById("userInput").value=text;
}

/* ================= ===== SMART NLP DATA (20+) ===== ================= */

const knowledgeBase = [

{keys:["hi","hello","hey","hii"], answer:"Welcome to BLAZE AI 👋"},
{keys:["who are you","your name"], answer:"I am BLAZE AI 🤖 Your Smart Assistant."},
{keys:["services","what do you do"], answer:"AI answers, Image generation, File reading, Voice support."},
{keys:["time","current time"], answer:()=>`Time: ${new Date().toLocaleTimeString()}`},
{keys:["date","today date"], answer:()=>`Date: ${new Date().toLocaleDateString()}`},

{keys:["ai","artificial intelligence"], answer:"AI makes machines think like humans."},
{keys:["machine learning","ml"], answer:"Machine Learning (ML) is a subset of artificial intelligence that focuses on building systems capable of learning from data and making decisions with minimal human intervention. It encompasses various algorithms like regression, classification, clustering, and reinforcement learning, which can be applied across industries such as healthcare, finance, and transportation to analyze patterns and predict outcomes."},
{keys:["deep learning"], answer:"Deep Learning is an advanced branch of ML that leverages multi-layered neural networks to model complex patterns in data. These deep neural networks are especially powerful for tasks such as image and speech recognition, natural language processing, and autonomous driving, as they can automatically discover intricate features from raw data through layers of nonlinear transformations."},

{keys:["frontend"], answer:"Frontend = UI built with HTML, CSS, JavaScript."},
{keys:["backend"], answer:"Backend handles server & database logic."},
{keys:["full stack"], answer:"Full Stack = Frontend + Backend + Database."},

{keys:["database"], answer:"Database stores data using MySQL, MongoDB etc."},
{keys:["cloud"], answer:"Cloud computing provides online servers like AWS & Azure."},
{keys:["cyber security"], answer:"Cyber Security protects systems from hackers."},

{keys:["blockchain"], answer:"Blockchain is a secure distributed ledger technology."},
{keys:["crypto","cryptocurrency"], answer:"Crypto like Bitcoin uses blockchain technology."},

// major tech companies
{keys:["google"], answer:"Google LLC is a multinational technology company specializing in Internet-related services and products such as search, advertising, cloud computing, software, and hardware. It's known for the Google Search engine, Android OS, and services like Gmail and Google Maps."},
{keys:["microsoft"], answer:"Microsoft Corporation is a leading technology company known for its Windows operating system, Office productivity suite, Azure cloud services, and hardware like Surface devices and Xbox. It develops software, services, and devices across consumer and enterprise markets."},

{keys:["app development"], answer:"App development builds mobile apps using Flutter/React Native."},

{keys:["web development"], answer:"Web development builds modern websites & apps."},

{keys:["seo"], answer:"SEO improves website ranking on Google."},
{keys:["freelancing"], answer:"Freelancing means working independently for clients."},

{keys:["career"], answer:"Tech careers: Developer, AI Engineer, Data Scientist, Cyber Expert."},
{keys:["motivation","motivate"], answer:"Consistency + Hard Work = Success 💪"},
{keys:["bye","goodbye"], answer:"Bye 👋 Thanks for using BLAZE AI!"},

{keys:["motivate"], answer:"Consistency builds success 💪"},
{keys:["how are you"], answer:"I am doing great, thanks for asking!"},
{keys:["sojith"], answer:"He is studing in kkdgms .He is a gana singer .He is popularly known as KUMARI VEDAN "},
{keys:["humanities first batch"], answer:"1.nishok 2.manikandan 3.balaji 4.sabarish 5.veera mani 6.sooraj 7.raghava hari8.godwin rabins 9.mithun"},
{keys:["jj techz"],answer:"JJ TECHZ is a dynamic and innovative web development company committed to helping businesses grow through modern technology solutions. With creativity, technical expertise, and a passion for innovation, JJ TECHZ aims to transform ideas into powerful digital experiences.JJ TECHZ was founded by J.JAFRO, a visionary entrepreneur with a strong interest in web technologies and digital innovation. As the Founder J. Jafro established the company with a clear mission to deliver high-quality, reliable, and affordable web solutions for businesses of all sizes. His leadership and forward-thinking mindset continue to guide the company toward excellence.Supporting this vision is the Co-Founder, S. Akilesh, whose dedication and technical knowledge play a vital role in the company’s growth.", image:"jj.png"}, 
{keys:["kkdgms"], answer:"KKDGMS-KanniyaKumari District Government Model School.It is a residential school.There are more than 400 students are studying ",image:"jamcet.jpg"},

// additional educational data entries
{keys:["html"], answer:"HTML (HyperText Markup Language) is the standard markup language for creating web pages. It uses tags like <html>, <head>, <body>, <div> to structure content."},
{keys:["css"], answer:"CSS (Cascading Style Sheets) is used to style HTML elements, controlling layout, colors, fonts, and responsive design."},
{keys:["javascript language"], answer:"JavaScript is a programming language that enables interactive web pages and is an essential part of web applications."},
{keys:["python"], answer:"Python is a high-level, interpreted language known for its readability and wide use in web development, data science, and automation."},
{keys:["java"], answer:"Java is an object-oriented programming language used for building platform-independent applications running on the Java Virtual Machine (JVM)."},
{keys:["c++"], answer:"C++ is a powerful general-purpose language with support for low-level memory manipulation, commonly used in system/software development and game programming."},
{keys:["data structures"], answer:"Data structures like arrays, linked lists, stacks, queues, trees, and graphs organize and store data efficiently for various algorithms."},
{keys:["algorithms"], answer:"Algorithms are step-by-step procedures for calculations; examples include sorting (quick sort, merge sort) and searching (binary search)."},
{keys:["object oriented programming","oop"], answer:"OOP is a paradigm based on objects and classes, encapsulation, inheritance, and polymorphism to model real-world concepts."},
{keys:["functional programming"], answer:"Functional programming treats computation as the evaluation of mathematical functions and avoids changing state or mutable data."},
{keys:["version control"], answer:"Version control systems like Git track changes to code, allow collaboration, and manage project history."},
{keys:["github"], answer:"Git is a distributed version control system used to manage project source code, allowing commits, branching, and merging."},
{keys:["docker"], answer:"Docker packages applications into containers, enabling consistent environments across development, testing, and production."},
{keys:["kubernetes"], answer:"Kubernetes automates deployment, scaling, and management of containerized applications across clusters of machines."},
{keys:["rest api"], answer:"REST API (Representational State Transfer) uses HTTP methods to perform CRUD operations on resources represented in JSON or XML."},
{keys:["json"], answer:"JSON (JavaScript Object Notation) is a lightweight data-interchange format commonly used in web APIs."},
{keys:["xml"], answer:"XML (eXtensible Markup Language) is a markup language used for encoding documents in a format that is both human- and machine-readable."},
{keys:["mobile development"], answer:"Mobile development builds applications for smartphones and tablets using native or cross-platform tools."},
{keys:["database normalization"], answer:"Normalization organizes database schemas to reduce redundancy and dependency by dividing tables into smaller ones and defining relationships."},
{keys:["sql"], answer:"SQL (Structured Query Language) is used to communicate with relational databases to perform queries and manage data."},
{keys:["nosql"], answer:"NoSQL databases like MongoDB, Cassandra, and Redis provide flexible schemas for unstructured or semi-structured data."},
{keys:["ai ethics"], answer:"AI ethics addresses moral issues like bias, privacy, and transparency when developing and deploying artificial intelligence."},
{keys:["natural language processing","nlp"], answer:"NLP enables machines to understand, interpret, and generate human language through techniques like tokenization and sentiment analysis."},
{keys:["computer vision"], answer:"Computer vision allows computers to interpret and process visual information from the world, such as images and videos."},
{keys:["robotics"], answer:"Robotics integrates engineering and computer science to design machines capable of performing tasks autonomously or semi-autonomously."},
{keys:["internet of things","iot"], answer:"IoT connects everyday objects to the internet, enabling data exchange and remote control."},
{keys:["cybersecurity","security"], answer:"Cybersecurity involves protecting systems and networks from digital attacks, malware, and data breaches."},
{keys:["cloud computing","cloud"], answer:"Cloud computing delivers computing services—servers, storage, databases, networking, etc.—over the internet on a pay-as-you-go basis."},
{keys:["big data"], answer:"Big Data refers to extremely large datasets that may be analyzed computationally to reveal patterns, trends, and associations."},
{keys:["deepfake"], answer:"Deepfake uses deep learning techniques to create realistic but fake audio or video content, raising ethical concerns."},
{keys:["quantum computing"], answer:"Quantum computing uses principles of quantum mechanics to perform certain calculations much faster than classical computers."},
{keys:["blockchain technology"], answer:"Blockchain technology enables secure, transparent, and tamper-proof ledgers by chaining blocks of transactional data."},

// scientific education entries
{keys:["physics"], answer:"Physics is the study of matter, energy, and the fundamental forces of nature, exploring concepts like motion, forces, waves, and quantum mechanics."},
{keys:["chemistry"], answer:"Chemistry examines substances, their properties, reactions, and the composition of matter at atomic and molecular levels."},
{keys:["biology"], answer:"Biology is the science of life and living organisms, including their structure, function, growth, evolution, and ecology."},
{keys:["genetics"], answer:"Genetics studies heredity and variation in organisms, focusing on genes, DNA, and how traits are passed between generations."},
{keys:["evolution"], answer:"Evolution describes the process by which species change over time through natural selection and genetic variation."},
{keys:["microbiology"], answer:"Microbiology is the study of microscopic organisms like bacteria, viruses, fungi, and protozoa."},
{keys:["astronomy"], answer:"Astronomy is the science of celestial objects, space, and the universe as a whole, including stars, planets, galaxies, and cosmology."},
{keys:["geology"], answer:"Geology investigates the Earth’s physical structure, history, and the processes that shape rocks, minerals, and landforms."},
{keys:["ecology"], answer:"Ecology examines relationships between organisms and their environments, including ecosystems, biodiversity, and conservation."},
{keys:["environmental science"], answer:"Environmental science integrates physical, biological, and information sciences to study the environment and solve ecological problems."},
{keys:["neuroscience"], answer:"Neuroscience explores the nervous system, especially the brain, and how it controls behavior, cognition, and bodily functions."},
{keys:["quantum mechanics"], answer:"Quantum mechanics is a branch of physics that describes the behavior of particles at atomic and subatomic scales."},
{keys:["relativity"], answer:"Relativity, proposed by Einstein, includes special and general relativity, explaining how space, time, and gravity interact."},
{keys:["thermodynamics"], answer:"Thermodynamics studies the relationships between heat, work, temperature, and energy in physical systems."},
{keys:["optics"], answer:"Optics is the branch of physics dealing with light, its properties, and interactions with matter, including lenses and lasers."},
{keys:["nanotechnology"], answer:"Nanotechnology manipulates matter at the nanoscale to create new materials and devices with unique properties."},
{keys:["biotechnology"], answer:"Biotechnology uses biological systems and organisms to develop products and technologies for medicine, agriculture, and industry."},
{keys:["robotics science"], answer:"Robotics science combines engineering, computer science, and AI to design robots for various tasks."},
{keys:["artificial intelligence"], answer:"Artificial intelligence studies algorithms and systems that mimic human intelligence for tasks like learning and problem solving."},
{keys:["climate change"], answer:"Climate change refers to long-term shifts in temperature and weather patterns, often due to human activities like burning fossil fuels."},
{keys:["meteorology"], answer:"Meteorology is the study of the atmosphere and weather processes, including forecasting and climate analysis."},
{keys:["oceanography"], answer:"Oceanography explores the physical and biological properties of the ocean, including currents, marine life, and ecosystems."},
{keys:["geophysics"], answer:"Geophysics applies physics to study the Earth’s interior, seismic activity, magnetic and gravitational fields."},
{keys:["astronautics"], answer:"Astronautics is the science of space travel and spacecraft design."},
{keys:["astrophysics"], answer:"Astrophysics applies physics to understand celestial phenomena like black holes, stars, and cosmic radiation."},
{keys:["biochemistry"], answer:"Biochemistry studies chemical processes within and related to living organisms, including enzymes and metabolism."},
{keys:["marine biology"], answer:"Marine biology studies organisms in the ocean, their behaviors, and interactions in marine ecosystems."},
{keys:["cell biology"], answer:"Cell biology examines cell structure and function, including organelles, cell division, and signaling."},
{keys:["anatomy"], answer:"Anatomy is the study of the structure of organisms and their parts, especially in humans and animals."},
{keys:["physiology"], answer:"Physiology studies how living organisms function, including systems like circulatory, respiratory, and nervous."},
{keys:["botany"], answer:"Botany is the scientific study of plants, their growth, reproduction, and classification."},
{keys:["zoology"], answer:"Zoology focuses on animals, their behavior, physiology, classification, and habitats."},
{keys:["biophysics"], answer:"Biophysics applies principles of physics to understand biological systems and structures."},
{keys:["molecular biology"], answer:"Molecular biology investigates biological activity at a molecular level, including DNA, RNA, and protein synthesis."},
{keys:["neurobiology"], answer:"Neurobiology studies the biology of the nervous system, including neurons and neural circuits."},
{keys:["geochemistry"], answer:"Geochemistry studies the chemical composition of Earth materials and processes, like mineral formation and elemental cycles."},
{keys:["paleontology"], answer:"Paleontology examines fossilized remains of organisms to understand their evolution and ancient environments."},
{keys:["forensic science"], answer:"Forensic science applies scientific methods to investigate crimes, analyzing physical evidence like DNA and fingerprints."},

// Tamil Nadu education related data
{keys:["tamil nadu board","tn board"], answer:"The Tamil Nadu State Board conducts SSLC and HSC exams and oversees school education in the state."},
{keys:["sslc"], answer:"SSLC (Secondary School Leaving Certificate) is the 10th standard public examination in Tamil Nadu."},
{keys:["hsc"], answer:"HSC (Higher Secondary Certificate) refers to 11th and 12th standard exams conducted by the TN board."},
{keys:["anna university"], answer:"Anna University is a technical university in Chennai known for engineering and technology programs."},
{keys:["iit madras"], answer:"IIT Madras is a premier engineering institute located in Chennai, part of the Indian Institutes of Technology."},
{keys:["nit trichy","nit tiruchirappalli"], answer:"NIT Trichy is a top National Institute of Technology offering engineering and sciences."},
{keys:["madras university"], answer:"University of Madras is one of the oldest universities in India, offering arts, science, and commerce courses."},
{keys:["tnea"], answer:"TNEA (Tamil Nadu Engineering Admissions) is a counselling process for entry to engineering colleges in the state."},
{keys:["tancet"], answer:"TANCET is the Tamil Nadu Common Entrance Test for MCA and MBA programs."},
{keys:["tnpsc"], answer:"TNPSC (Tamil Nadu Public Service Commission) conducts recruitment exams for state government jobs."},
{keys:["diit"], answer:"DIET (District Institute for Education and Training) provides teacher education and training across Tamil Nadu."},
{keys:["school education department"], answer:"The TN School Education Department manages curriculum, teachers, and policies for schools."},
{keys:["higher education department"], answer:"Tamil Nadu Higher Education Department oversees colleges, universities, and technical institutes."},
{keys:["tamil nadu government school"], answer:"Government schools in TN offer free education following the state board syllabus."},
{keys:["cbse tamil nadu"], answer:"Several CBSE-affiliated schools operate in Tamil Nadu, following the national curriculum."},
{keys:["medical college tamil nadu"], answer:"Tamil Nadu has many government medical colleges like Madras Medical College and Stanley Medical College."},
{keys:["engineering college tamil nadu"], answer:"State and private engineering colleges in TN include PSG College of Technology, CEG, and Coimbatore Govt. College."},
{keys:["tamil nadu higher secondary"], answer:"Higher secondary refers to classes 11 and 12 under the TN Board or other boards in the state."},
{keys:["teacher education"], answer:"Teacher education in TN is provided through B.Ed. programs at colleges and DIETs."},
{keys:["technical education department"], answer:"The Directorate of Technical Education governs polytechnics and engineering institutions."},
{keys:["tamil nadu university"], answer:"Tamil Nadu has multiple state universities including Bharathiar University and Anna University."},
{keys:["distance education tamil nadu"], answer:"Distance education programs from universities like Annamalai University serve working students."},
{keys:["gandhigram university"], answer:"Gandhigram Rural Institute is a deemed university focusing on rural development studies."},
{keys:["loyola college"], answer:"Loyola College Chennai is a prestigious autonomous arts and science college."},
{keys:["st josephs college"], answer:"St Joseph's College in Tiruchirappalli offers arts and science courses with a long history."},
{keys:["chennai education"], answer:"Chennai hosts numerous schools and colleges, including IIT Madras and University of Madras."},
{keys:["coimbatore education"], answer:"Coimbatore is home to engineering colleges like PSG Tech and Amrita University."},
{keys:["madurai education"], answer:"Madurai offers universities like Madurai Kamaraj University and various polytechnics."},
{keys:["tn govt scholarship"], answer:"The Tamil Nadu government provides scholarships for students in various streams based on merit and income."},
{keys:["vet education"], answer:"Vocational education and training (VET) in Tamil Nadu is offered through ITIs and polytechnics."},
{keys:["tn education board"], answer:"The Tamil Nadu Education Board sets the curriculum and conducts public exams for schools."},
{keys:["namakkal"], answer:"Namakkal district hosts several engineering and arts colleges serving central Tamil Nadu."},
{keys:["tiruchirappalli"], answer:"Tiruchirappalli (Trichy) is a major educational hub with NIT Trichy and Bharathidasan University."},
{keys:["villupuram"], answer:"Villupuram has government schools and colleges administered by the TN state board."},
{keys:["vellore"], answer:"Vellore houses VIT University and CMC Vellore medical college."},
{keys:["tirunelveli"], answer:"Tirunelveli region includes Manonmaniam Sundaranar University and various professional colleges."},

// Kanniyakumari data entries
{keys:["kanniyakumari","kanyakumari"], answer:"Kanyakumari is the southernmost tip of mainland India, located in Tamil Nadu. It's famous for its sunrise and sunset over the ocean, the Vivekananda Rock Memorial, and the Sangam where three seas meet."},
{keys:["kanniyakumari history"], answer:"Historically known as Cape Comorin, Kanyakumari has been a port and a center of trade since ancient times, ruled by the Chera, Chola, and Pandya dynasties before becoming part of modern Tamil Nadu."},
{keys:["kanniyakumari tourism"], answer:"Key attractions include the Vivekananda Rock Memorial, Thiruvalluvar Statue, Padmanabhapuram Palace nearby, local beaches, and daily boat trips to the Memorial rock."},
{keys:["kanniyakumari geography"], answer:"Geographically, Kanyakumari lies at the junction of the Arabian Sea, Bay of Bengal, and Indian Ocean and experiences a tropical climate with monsoon rains."},
{keys:["kanniyakumari culture"], answer:"The culture of Kanyakumari reflects Tamil traditions with festivals like Pongal, Navaratri, and unique rituals at the Kanyakumari temple dedicated to goddess Kanya Kumari."},

// general facts
{keys:["earth facts"], answer:"Earth is the third planet from the Sun and the only known planet to support life, with 71% of its surface covered by water."},

// TN 10th science book facts
{keys:["matter"], answer:"Matter is anything that has mass and occupies space. It can exist in solid, liquid, or gaseous states."},
{keys:["atom"], answer:"An atom is the smallest unit of matter, composed of protons, neutrons, and electrons."},
{keys:["molecule"], answer:"A molecule is a group of two or more atoms bonded together, representing the smallest unit of a chemical compound."},
{keys:["chemical reactions"], answer:"Chemical reactions involve the rearrangement of atoms to form new substances, often accompanied by energy changes."},
{keys:["mixtures and solutions"], answer:"Mixtures combine two or more substances physically; solutions are homogeneous mixtures where one substance dissolves in another."},
{keys:["elements"], answer:"Elements are pure substances made of only one type of atom, listed in the periodic table."},
{keys:["compounds"], answer:"Compounds are substances formed when two or more elements chemically bond in fixed proportions."},
{keys:["forces"], answer:"Forces are pushes or pulls that can change an object's motion. Common forces include gravity, friction, and applied force."},
{keys:["pressure"], answer:"Pressure is the force applied per unit area; liquids and gases exert pressure in all directions."},
{keys:["work and energy"], answer:"Work is done when a force moves an object; energy is the capacity to do work."},
{keys:["power"], answer:"Power is the rate at which work is done or energy is transferred."},
{keys:["heat"], answer:"Heat is energy transferred due to temperature difference; it can raise a substance's temperature or change its state."},
{keys:["waves"], answer:"Waves carry energy without transporting matter; examples include sound waves and light waves."},
{keys:["sound"], answer:"Sound is a mechanical wave produced by vibrating objects and travels through a medium like air or water."},
{keys:["light"], answer:"Light is an electromagnetic wave that enables vision and travels fastest in vacuum."},
{keys:["reflection"], answer:"Reflection occurs when light bounces off a surface at the same angle it hits it."},
{keys:["refraction"], answer:"Refraction is the bending of light as it passes from one medium to another due to speed change."},
{keys:["lenses"], answer:"Lenses are transparent objects that refract light to converge or diverge rays, used in glasses and microscopes."},
{keys:["electricity"], answer:"Electricity is the flow of electric charge, usually through conductors like metals."},
{keys:["current"], answer:"Electric current is the rate of flow of charge through a conductor, measured in amperes."},
{keys:["voltage"], answer:"Voltage is the potential difference between two points, driving current through a circuit."},
{keys:["resistance"], answer:"Resistance opposes the flow of current in a material, measured in ohms."},
{keys:["ohm's law"], answer:"Ohm's law states that current through a conductor is directly proportional to voltage and inversely proportional to resistance."},
{keys:["magnetism"], answer:"Magnetism is the force exerted by magnets, arising from moving electric charges or inherent magnetic moments."},
{keys:["electromagnetism"], answer:"Electromagnetism studies the interaction between electric charges and magnetic fields."},
{keys:["solids"], answer:"Solids have fixed shape and volume with closely packed particles."},
{keys:["liquids"], answer:"Liquids have fixed volume but take the shape of their container; particles can move past each other."},
{keys:["gases"], answer:"Gases have no fixed shape or volume and expand to fill their container; particles move freely."},
{keys:["acid"], answer:"Acids are substances that release hydrogen ions (H+) in solution and have a sour taste."},
{keys:["base"], answer:"Bases release hydroxide ions (OH-) in solution and have a bitter taste; they feel slippery."},
{keys:["ph scale"], answer:"The pH scale measures acidity or alkalinity of a solution; 7 is neutral, below 7 is acidic, above 7 is basic."},
{keys:["metals"], answer:"Metals are elements that conduct heat and electricity, are malleable, and often shiny."},
{keys:["non-metals"], answer:"Non-metals do not conduct heat or electricity well and are often brittle in solid form."},
{keys:["carbon compounds"], answer:"Carbon compounds form the basis of organic chemistry; carbon atoms can bond in various ways."},
{keys:["human eye"], answer:"The human eye detects light and has parts like cornea, lens, retina, and optic nerve."},
{keys:["cell"], answer:"A cell is the basic unit of life, with organelles like nucleus and mitochondria."},
{keys:["ecosystem"], answer:"An ecosystem includes organisms and their environment interacting as a unit."},
{keys:["pollution"], answer:"Pollution is the introduction of harmful substances into the environment, affecting air, water, and soil."},
{keys:["global warming"], answer:"Global warming is the rise in Earth's average temperature due to greenhouse gas emissions."},
{keys:["renewable energy"], answer:"Renewable energy comes from sources like solar, wind, and water that are naturally replenished."},

// advanced mathematics and numerical data
{keys:["algebra"], answer:"Algebra is the branch of mathematics dealing with symbols and the rules for manipulating those symbols, representing numbers and relationships."},
{keys:["geometry"], answer:"Geometry studies shapes, sizes, and properties of space and figures, including points, lines, circles, and polygons."},
{keys:["trigonometry"], answer:"Trigonometry explores the relationships between the angles and sides of triangles, using functions like sine, cosine, and tangent."},
{keys:["calculus"], answer:"Calculus is the mathematical study of change, encompassing derivatives, integrals, limits, and infinite series."},
{keys:["differential equations"], answer:"Differential equations involve functions and their derivatives and model how quantities change over time or space."},
{keys:["linear algebra"], answer:"Linear algebra focuses on vector spaces and linear mappings between these spaces, using matrices and determinants."},
{keys:["statistics"], answer:"Statistics is the science of collecting, analyzing, interpreting, presenting, and organizing data."},
{keys:["probability"], answer:"Probability measures the likelihood of events, using values between 0 and 1 to describe uncertainty."},
{keys:["number theory"], answer:"Number theory studies the properties and relationships of numbers, especially integers and prime numbers."},
{keys:["matrices"], answer:"Matrices are rectangular arrays of numbers used to represent linear transformations and solve systems of equations."},
{keys:["vector"], answer:"A vector is a quantity with both magnitude and direction, often represented in coordinate systems."},
{keys:["matrix multiplication"], answer:"Matrix multiplication combines two matrices to produce a third, following specific row-by-column rules."},
{keys:["complex numbers"], answer:"Complex numbers have a real part and an imaginary part and are written in the form a + bi."},
{keys:["numerical methods"], answer:"Numerical methods approximate solutions to mathematical problems using algorithms and computational techniques."},
{keys:["fouriertransform"], answer:"The Fourier transform decomposes functions into frequencies, widely used in signal processing."},
{keys:["laplace transform"], answer:"The Laplace transform converts differential equations into algebraic equations for easier solving."},
{keys:["sequences"], answer:"A sequence is an ordered list of numbers following a specific rule or pattern."},
{keys:["series"], answer:"A series is the sum of the terms of a sequence, which may converge or diverge."},
{keys:["limits"], answer:"A limit describes the value that a function or sequence approaches as the input or index approaches some point."},
{keys:["integral"], answer:"An integral represents the area under a curve and is a fundamental concept in calculus."},
{keys:["derivative"], answer:"A derivative measures the rate at which a function changes with respect to a variable."},
{keys:["matrix determinant"], answer:"The determinant is a scalar value computed from a square matrix and indicates if the matrix is invertible."},
{keys:["eigenvalues"], answer:"Eigenvalues are scalars associated with a linear transformation that scale eigenvectors without changing their direction."},
{keys:["pi"], answer:"Pi is the ratio of a circle’s circumference to its diameter, approximately 3.14159."},
{keys:["e"], answer:"Euler's number e is approximately 2.71828 and is the base of natural logarithms."},
{keys:["phi"], answer:"Phi (φ), the golden ratio, is approximately 1.618 and appears in geometry and art."},
{keys:["prime numbers"], answer:"Prime numbers are integers greater than 1 with no positive divisors other than 1 and themselves."},
{keys:["fibonacci"], answer:"The Fibonacci sequence begins 0,1,1,2,3,... with each number the sum of the two preceding ones."},
{keys:["binary"], answer:"Binary is a base-2 numeral system using digits 0 and 1, fundamental in computer science."},
{keys:["hexadecimal"], answer:"Hexadecimal is base-16 numbering using digits 0–9 and letters A–F, often used in computing."},
{keys:["logarithm"], answer:"A logarithm is the inverse operation to exponentiation, indicating the power to which a base must be raised."},
{keys:["exponential"], answer:"Exponential functions involve variables in the exponent and model rapid growth or decay."},
{keys:["quadratic equation"], answer:"A quadratic equation has the form ax² + bx + c = 0 and can be solved using the quadratic formula."},
{keys:["pi value"], answer:"Pi ≈ 3.14159; used in calculations involving circles and trigonometry."},
{keys:["square root"], answer:"A square root of a number x is a value y such that y² = x."},

{keys:["sun"], answer:"The Sun is a G-type main-sequence star composed primarily of hydrogen and helium, and it powers life on Earth through nuclear fusion in its core."},
{keys:["moon"], answer:"Earth's Moon is its only natural satellite and is responsible for tides; it formed roughly 4.5 billion years ago."},
{keys:["gravity"], answer:"Gravity is a force of attraction between masses; on Earth it gives weight to physical objects and causes apples to fall from trees."},
{keys:["speed of light"], answer:"The speed of light in vacuum is approximately 299,792 kilometers per second, and it is the universal speed limit according to relativity."},
{keys:["human body"], answer:"The human body is made up of trillions of cells; the heart pumps about 5 liters of blood per minute."},
{keys:["water facts"], answer:"Water expands when frozen, making ice less dense than liquid water, which is why icebergs float."},
{keys:["air"], answer:"Air is composed mainly of nitrogen (78%) and oxygen (21%), with small amounts of other gases like argon and carbon dioxide."},
{keys:["recycling"], answer:"Recycling transforms waste into new products, reducing the need for raw materials and lowering environmental impact."},
{keys:["photosynthesis"], answer:"Photosynthesis is the process by which plants use sunlight, carbon dioxide, and water to produce glucose and oxygen."},
{keys:["vaccines"], answer:"Vaccines stimulate the immune system to protect against diseases by introducing harmless parts of pathogens."},
{keys:["dna"], answer:"DNA (deoxyribonucleic acid) carries genetic instructions for the development and functioning of living organisms."},
{keys:["atom"], answer:"An atom consists of a nucleus made of protons and neutrons, surrounded by electrons; it's the basic unit of matter."},
{keys:["periodic table"], answer:"The periodic table organizes chemical elements by increasing atomic number and recurring chemical properties."},
{keys:["plate tectonics"], answer:"Plate tectonics explains the movement of Earth's lithospheric plates, causing earthquakes, volcanoes, and continental drift."},
{keys:["ocean"], answer:"Oceans cover over 70% of Earth's surface and contain about 97% of the planet's water."},
{keys:["human brain"], answer:"The human brain contains around 86 billion neurons, enabling thought, memory, and sensing."},
{keys:["ecosystem"], answer:"An ecosystem includes all living organisms and their physical environment interacting as a system."},
{keys:["biodiversity"], answer:"Biodiversity refers to the variety of life on Earth, important for ecosystem resilience."},
{keys:["solar system"], answer:"Our solar system consists of the Sun and the objects orbiting it, including eight planets, dwarf planets, asteroids, and comets."},
{keys:["stars"], answer:"Stars are massive luminous spheres of plasma held together by gravity, and they are the building blocks of galaxies."},
{keys:["black hole"], answer:"A black hole is a region in space with gravity so intense that nothing, not even light, can escape from it."},
{keys:["fossils"], answer:"Fossils are preserved remains or traces of ancient organisms, providing evidence of past life on Earth."},
{keys:["volcano"], answer:"A volcano is an opening in Earth’s crust that allows molten rock, ash, and gases to escape from beneath the surface."},
{keys:["rain"], answer:"Rain is liquid water that falls from clouds when vapor condenses and droplets grow heavy enough to overcome updrafts."},
{keys:["wind"], answer:"Wind is air in motion, caused by differences in atmospheric pressure due to temperature variations."},
{keys:["ecosystem"], answer:"An ecosystem includes all living organisms and their physical environment interacting as a system."},
{keys:["volcanoes"], answer:"Volcanoes can form mountains and islands and are often located along tectonic plate boundaries."},
{keys:["mountains"], answer:"Mountains form through tectonic forces or volcanism and typically have steep slopes and significant elevation."},
{keys:["desert"], answer:"Deserts receive less than 250 mm of rainfall per year and often have sparse vegetation."},
];

/* ================= NLP MATCH ENGINE ================= */

// compute basic similarity score between two strings using longest common substring length
function similarity(a, b){
    a = a.toLowerCase();
    b = b.toLowerCase();
    let max = 0;
    for(let i=0;i<a.length;i++){
        for(let j=0;j<b.length;j++){
            let l = 0;
            while(a[i+l] && b[j+l] && a[i+l]===b[j+l]) l++;
            if(l>max) max=l;
        }
    }
    return max / Math.max(a.length, b.length);
}

function checkLocal(input){
    input = input.toLowerCase();
    const words = input.split(" ");

    // direct match first
    for(let item of knowledgeBase){
        for(let key of item.keys){
            if(words.includes(key) || input.includes(key)){
                // bump usage count if tracking
                item.usage = (item.usage||0)+1;
                return typeof item.answer==="function" ? item.answer() : item.answer;
            }
        }
    }

    // fuzzy search if no exact key
    let best = {score:0, item:null};
    for(let item of knowledgeBase){
        for(let key of item.keys){
            const score = similarity(input, key);
            if(score>best.score && score>0.4){ // threshold
                best = {score, item};
            }
        }
    }
    if(best.item){
        best.item.usage = (best.item.usage||0)+1;
        return typeof best.item.answer==="function" ? best.item.answer() : best.item.answer;
    }

    return null;
}

/* ================= USER DATA LEARNING ================= */

function loadUserData(){
    const data = JSON.parse(localStorage.getItem('jjData') || '[]');
    for(const item of data){
        knowledgeBase.push(item);
    }
}

function saveUserData(entry){
    const data = JSON.parse(localStorage.getItem('jjData') || '[]');
    data.push(entry);
    localStorage.setItem('jjData', JSON.stringify(data));
}

// load stored lessons on startup
loadUserData();


/* ================= AI ================= */

async function getAI(prompt){

try{
const res=await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+API_KEY
},
body:JSON.stringify({
model:"gpt-4o-mini",
messages:[{role:"user",content:prompt}]
})
});

const data=await res.json();
return data.choices[0].message.content;

}catch(err){
return "SORRY,I AM STILL LEARNING";
}
}

/* ================= SEND MESSAGE ================= */

async function sendMessage(){

    const input=document.getElementById("userInput");
    const text=input.value.trim();
    if(!text) return;

    addMessage(text,"user");
    input.value="";

    let localReply=checkLocal(text);
    if(localReply){
        addMessage(localReply,"bot");
        // log to server
        sendChatToServer(text, localReply);
    } else {
        // show typing animation similar to ChatGPT
        const typingElem = showTyping();
        const reply = await getAI(text);
        typingElem.remove();
        addMessageAnimated(reply);
        // save the new question/answer pair for future local use
        const entry = { keys: [text.toLowerCase()], answer: reply };
        saveUserData(entry);
        knowledgeBase.push(entry);
        // log to server
        sendChatToServer(text, reply);
    }
}

// send chat messages to backend for collection
async function sendChatToServer(userText, botText){
    try{
        await fetch('http://localhost:8080/api/chat',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({user:userText, bot:botText, time:new Date().toISOString()})
        });
    }catch(e){
        console.warn('chat log failed',e);
    }
}

/* ================= IMAGE ================= */

function generateImage(){

let promptText=prompt("Enter Image Prompt:");
if(!promptText) return;

addMessage("Image: "+promptText,"user");

setTimeout(()=>{
addMessage("","bot");
chat.lastChild.innerHTML=
`<img src="https://source.unsplash.com/500x300/?${encodeURIComponent(promptText)}"
style="width:100%;border-radius:10px">`;
},1500);
}

/* ================= FILE ================= */

function readFile(event){

const file=event.target.files[0];
if(!file) return;

const reader=new FileReader();
reader.onload=function(e){
addMessage("File Content:\n"+e.target.result,"bot");
};
reader.readAsText(file);
}

/* ================= VOICE ================= */

function startVoice(){

if(!('webkitSpeechRecognition'in window))
return alert("Voice not supported");

const recognition=new webkitSpeechRecognition();
recognition.lang="en-US";
recognition.start();

recognition.onresult=function(e){
document.getElementById("userInput").value=
e.results[0][0].transcript;
sendMessage();
};
}

/* ================= EXTRA FEATURES ================= */

function clearChat(){
chat.innerHTML="";
localStorage.removeItem("jjChat");
}

function toggleTheme(){
    document.body.classList.toggle("light");
}

// allow manual addition of knowledge via prompt
function addKnowledge(){
    const phrase = prompt("Enter the question or keyword you want to teach the bot:");
    if(!phrase) return;
    const answer = prompt("Enter the response the bot should give:");
    if(!answer) return;
    const entry = { keys: [phrase.toLowerCase()], answer };
    saveUserData(entry);
    knowledgeBase.push(entry);
    alert("Knowledge added successfully!");
}

function downloadChat(){
const text=chat.innerText;
const blob=new Blob([text],{type:"text/plain"});
const url=URL.createObjectURL(blob);
const a=document.createElement("a");
a.href=url;
a.download="chat.txt";
a.click();
URL.revokeObjectURL(url);
}

/* ================= AUTO LOGIN ================= */

if(localStorage.getItem("jjUser")){
    const name = localStorage.getItem("jjUser");
    document.getElementById("login").style.display="none";
    document.getElementById("app").style.display="flex";
    updateProfile(name);
    loadChat();
}

/* ================= TYPING LOADER ================= */

function showTyping(){
    // create a dedicated thinking bubble with animated dots
    const typing=document.createElement("div");
    typing.className="msg bot thinking"; // extra styling

    typing.innerHTML=`
<div class="typing">
    <span></span>
    <span></span>
    <span></span>
</div>
`;

    chat.appendChild(typing);
    chat.scrollTop=chat.scrollHeight;

    return typing;
}
