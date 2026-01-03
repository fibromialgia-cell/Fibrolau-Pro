import { InfoCardData } from './types';

export const INFO_CARDS_DATA: InfoCardData[] = [
    {
        title: "¿Qué es la Fibromialgia?",
        icon: 'question',
        details: [
            { type: 'paragraph', text: "La fibromialgia es un trastorno neurológico crónico clasificado como un **Síndrome de Sensibilización Central**. Esto significa que el sistema nervioso central (cerebro y médula espinal) procesa las señales de dolor de forma anómala, amplificándolas. Imagina que el 'control de volumen' del dolor en tu cuerpo está permanentemente subido al máximo. No es una enfermedad degenerativa, autoinmune ni inflamatoria, y es completamente real, no 'psicológica'." },
            { type: 'paragraph', text: "A nivel neuroquímico, se observa un desequilibrio en neurotransmisores clave: niveles bajos de **serotonina** y **norepinefrina** (que ayudan a inhibir el dolor) y niveles elevados de **sustancia P** (un neurotransmisor que transmite las señales de dolor). Esto crea un estado de 'tormenta perfecta' para la percepción del dolor. Investigaciones recientes también apuntan a la **neuroinflamación** (inflamación de bajo grado en el sistema nervioso) y a una disfunción de las mitocondrias, las 'centrales energéticas' de nuestras células, lo que podría explicar la fatiga extrema." },
            { type: 'paragraph', text: "El diagnóstico es clínico y se basa en criterios como el Índice de Dolor Generalizado y la Escala de Gravedad de los Síntomas, ya que no existen análisis de sangre o radiografías que puedan confirmarla. A menudo se le llama un 'diagnóstico de exclusión', lo que significa que los médicos primero descartan otras condiciones que pueden causar síntomas similares (como hipotiroidismo, artritis reumatoide o lupus). Frecuentemente se desencadena o agrava por eventos como traumas físicos (accidentes), cirugías, infecciones virales o estrés emocional intenso y prolongado." },
        ],
        colorName: "violet",
    },
    {
        title: "Síntomas Comunes",
        icon: 'brain',
        details: [
             { type: 'paragraph', text: "Los síntomas son complejos, variados y fluctuantes. Además de los síntomas principales, existen muchos otros que pueden afectar significativamente la calidad de vida:" },
             { type: 'list', items: [
                '**Dolor Generalizado:** Un dolor crónico, profundo y persistente, a menudo descrito como quemante, punzante, palpitante o como si los músculos estuvieran magullados. Afecta a múltiples áreas del cuerpo en ambos lados.',
                '**Fatiga Extrema:** No es un simple cansancio; es una fatiga debilitante que no se alivia con el sueño. Se asemeja a la sensación de tener una gripe constante, afectando tanto la energía física como la mental.',
                '**Dificultades Cognitivas (Fibroniebla):** Afecta a funciones ejecutivas, causando problemas para encontrar palabras, pérdida de memoria a corto plazo, dificultad para concentrarse y una sensación general de estar mentalmente \'espeso\' o desorientado.',
                '**Trastornos del Sueño:** El sueño no es reparador. A pesar de dormir las horas necesarias, la persona se despierta sintiéndose agotada. Son comunes el insomnio (de inicio o mantenimiento), el sueño fragmentado y el síndrome de piernas inquietas.',
                '**Rigidez Matutina:** Al despertar, el cuerpo puede sentirse rígido y dolorido, similar a la rigidez de la artritis, aunque esta suele mejorar con el movimiento suave a lo largo de la mañana.',
                '**Hipersensibilidad Sensorial:** Sensibilidad aumentada al dolor (hiperalgesia) y dolor provocado por estímulos que normalmente no duelen, como un roce suave (alodinia). También hay alta sensibilidad a luces brillantes, ruidos fuertes, olores intensos, cambios de temperatura y a ciertos químicos.',
                '**Problemas Digestivos:** El Síndrome del Intestino Irritable (SII) es extremadamente común, causando hinchazón, gases, dolor abdominal, diarrea o estreñimiento.',
                '**Cefaleas y Migrañas:** Los dolores de cabeza tensionales crónicos y las migrañas son frecuentes debido a la sensibilización del sistema nervioso.',
                '**Mareos y Problemas de Equilibrio:** Sensación de inestabilidad o mareo, a menudo relacionado con disfunciones del sistema nervioso autónomo.',
                '**Síntomas Emocionales:** La ansiedad y la depresión son muy comunes, tanto como una reacción a vivir con una enfermedad crónica como por compartir las mismas vías neuroquímicas desreguladas.'
             ]}
        ],
        colorName: "sky",
    },
    {
        title: "Pilares del Tratamiento",
        icon: 'syringe',
        details: [
            { type: 'paragraph', text: 'El manejo eficaz de la fibromialgia no depende de una única "píldora mágica", sino de un enfoque proactivo, personalizado y multifacético. La estrategia más exitosa se basa en varios pilares fundamentales:' },
            { type: 'paragraph', text: '**1. Educación sobre el Dolor (El Pilar Cero):**' },
            { type: 'paragraph', text: '¡El conocimiento es poder! Entender que el dolor se debe a un sistema nervioso hipersensible (sensibilización central) y no a un daño físico progresivo, es el primer paso para recuperarse. Reduce el miedo y la ansiedad, lo que a su vez disminuye la intensidad con la que percibes el dolor.' },
            { type: 'paragraph', text: '**2. Tratamiento Farmacológico (Supervisado por un médico):**' },
            { type: 'list', items: [
                '**Moduladores del Dolor:** Los fármacos más utilizados no son analgésicos tradicionales. Antidepresivos (como la Duloxetina o Amitriptilina) y anticonvulsivos (como la Pregabalina) actúan sobre los neurotransmisores en el cerebro para reequilibrar la química cerebral, reducir la amplificación de las señales de dolor y mejorar el sueño.',
                '**Relajantes Musculares:** Pueden ser útiles en periodos de alta contractura muscular o para ayudar a conciliar el sueño, pero generalmente se usan a corto plazo.',
                '**Analgésicos:** Se prefieren analgésicos no opioides como el paracetamol o el tramadol (con precaución). Los opioides fuertes (morfina, oxicodona) se evitan activamente, ya que no son eficaces a largo plazo y conllevan alto riesgo de dependencia.'
            ]},
            { type: 'paragraph', text: '**3. Terapias Físicas y de Movimiento:**' },
            { type: 'list', items: [
                '**Fisioterapia:** Esencial para romper el ciclo de dolor e inactividad. Un fisioterapeuta especializado en dolor crónico te enseñará a realizar estiramientos suaves, mejorar la postura y fortalecer los músculos de forma gradual y segura.',
                '**Terapia Ocupacional:** Se centra en la **gestión de la energía (pacing)**. Te ayuda a analizar tus actividades diarias y a encontrar formas de modificarlas para equilibrar el descanso y la actividad, una de las habilidades más importantes en el manejo de la enfermedad.',
                '**Ejercicio Gradual:** Mover el cuerpo es una de las mejores medicinas. Se empieza con actividades de bajo impacto como caminar, nadar o Tai Chi, de forma muy suave y progresiva.'
            ]},
            { type: 'paragraph', text: '**4. Apoyo Psicológico y Estrategias Mente-Cuerpo:**' },
            { type: 'paragraph', text: 'Esta es una de las áreas más cruciales, enfocada en calmar el sistema nervioso y cambiar tu relación con el dolor. Estas estrategias son un tratamiento de primera línea.' },
            { type: 'list', items: [
                '**Terapia Cognitivo-Conductual (TCC):** Te da herramientas prácticas para identificar y cambiar los patrones de pensamiento negativos ("este dolor nunca se irá") y los comportamientos que empeoran los síntomas (como el miedo al movimiento).',
                '**Terapia de Aceptación y Compromiso (ACT):** Se centra en aceptar las sensaciones que no puedes controlar (como el dolor) y comprometerte a vivir una vida plena y con propósito a pesar de ellas.',
                '**Manejo del Estrés y Relajación:** El estrés es como echarle gasolina al fuego de la fibromialgia. Técnicas como la respiración diafragmática, el mindfulness y la relajación muscular progresiva ayudan a activar el "freno" de tu sistema nervioso.'
            ]}
        ],
        colorName: "emerald",
    },
    {
        title: "Enfermedades Asociadas",
        icon: 'link',
        details: [
            { type: 'paragraph', text: "La fibromialgia pertenece a una familia de trastornos conocidos como **Síndromes de Sensibilización Central (SSC)**. Esto significa que el 'cableado' del sistema nervioso está en un estado de alerta constante, lo que predispone a la persona a desarrollar otras condiciones que comparten este mismo mecanismo. Reconocer estas comorbilidades es clave para un tratamiento integral." },
            { type: 'paragraph', text: '**1. Solapamiento con otros Síndromes de Dolor y Fatiga:**' },
            { type: 'list', items: [
                '**Síndrome de Fatiga Crónica / Encefalomielitis Miálgica (SFC/EM):** Es la comorbilidad más común. Mientras el dolor es el síntoma principal en la fibromialgia, la fatiga debilitante y el **malestar post-esfuerzo** (un empeoramiento severo de los síntomas después de un mínimo esfuerzo) son los sellos distintivos del SFC/EM.',
                '**Migrañas y Cefaleas Tensionales:** Un sistema nervioso hipersensible es más propenso a los desencadenantes de dolores de cabeza, convirtiendo estímulos menores en dolor severo.',
                '**Síndrome de Dolor Miofascial:** Se caracteriza por puntos gatillo (nudos musculares muy dolorosos) que pueden coexistir y agravar el dolor generalizado de la fibromialgia.',
                '**Trastornos Temporomandibulares (ATM):** El dolor en la mandíbula, la dificultad para masticar y los chasquidos son frecuentes, ya que los músculos de la mandíbula también están controlados por un sistema nervioso sensibilizado.'
            ]},
            { type: 'paragraph', text: '**2. Conexión Mente-Cuerpo y Sistema Nervioso Autónomo:**' },
            { type: 'list', items: [
                '**Trastornos de Ansiedad y Depresión:** La relación es bidireccional. El dolor crónico es un factor estresante que puede causar ansiedad y depresión, pero también comparten vías neuroquímicas (como la serotonina) con la fibromialgia, lo que explica su alta coexistencia.',
                 '**Síndrome de Taquicardia Postural Ortostática (POTS):** Una disfunción del sistema nervioso autónomo que causa un aumento anormal de la frecuencia cardíaca al ponerse de pie, provocando mareos, palpitaciones y fatiga extrema.',
                 '**Disfunción Vestibular:** Problemas de equilibrio, mareos y vértigo son comunes, ya que el sistema vestibular (responsable del equilibrio) también puede verse afectado por la sensibilización central.'
            ]},
            { type: 'paragraph', text: '**3. Manifestaciones en otros Sistemas:**' },
            { type: 'list', items: [
                '**Síndrome del Intestino Irritable (SII):** La fuerte conexión del **eje cerebro-intestino**, una autopista de comunicación bidireccional, explica por qué un sistema nervioso central en alerta puede causar estragos en el sistema digestivo, provocando dolor, hinchazón, diarrea y/o estreñimiento.',
                '**Síndrome de Vejiga Dolorosa (Cistitis Intersticial):** Es la sensibilización central manifestándose en la vejiga, causando urgencia y dolor al orinar sin que haya una infección.',
                '**Síndrome de Piernas Inquietas (SPI):** Una necesidad incontrolable de mover las piernas, especialmente por la noche, que interrumpe gravemente el sueño y está ligada a desequilibrios de dopamina en el cerebro.',
                '**Endometriosis:** Aunque es una condición ginecológica, el dolor pélvico crónico que genera puede ser \'aprendido\' y centralizado por el sistema nervioso, creando un ciclo de dolor que se solapa y amplifica mutuamente con la fibromialgia.'
            ]},
        ],
        colorName: "rose",
    },
    {
        title: "Ejercicio: Tu Mejor Medicina",
        icon: 'sparkles',
        details: [
            { type: 'paragraph', text: 'Para una persona con fibromialgia, el ejercicio no es una opción, es un tratamiento esencial. El movimiento regular ayuda a liberar neuroquímicos que reducen el dolor (endorfinas), mejora la calidad del sueño, aumenta la energía y eleva el estado de ánimo. La clave es encontrar el equilibrio correcto para evitar el ciclo de "actividad-crisis" (excederse en un día bueno y pagarlo con varios días de dolor intenso).' },
            { type: 'paragraph', text: '**La Filosofía: "Empieza Bajo, Avanza Lento" y "Pacing"**' },
            { type: 'paragraph', text: 'Tu objetivo es la **consistencia**, no la intensidad. Es mejor caminar 10 minutos todos los días que hacer una caminata de una hora una vez a la semana. El **pacing** o gestión de la energía es fundamental: aprende a escuchar a tu cuerpo, planifica descansos antes de sentirte agotado y aumenta la actividad de forma muy gradual.' },
            { type: 'list', items: [
                '**Encuentra tu Línea de Base:** Identifica una cantidad de ejercicio que puedas hacer cómodamente incluso en un día malo. Esa es tu línea de base segura.',
                '**Mantén y Progresa Mínimamente:** Repite esa actividad durante una o dos semanas antes de aumentarla en solo un 10%. El progreso es lento pero seguro.',
                '**Calentamiento y Enfriamiento:** Siempre dedica 5 minutos a un calentamiento suave antes y 5 minutos a estiramientos muy suaves al terminar.'
            ]},
            { type: 'paragraph', text: '**Tipos de Ejercicio Ideales:**' },
            { type: 'list', items: [
                '**Cardio de Bajo Impacto:** Caminar, bicicleta estática o elíptica y, sobre todo, los **ejercicios acuáticos** (caminar en la piscina, aquaeróbic) son excelentes, ya que el agua soporta el peso del cuerpo.',
                '**Fortalecimiento Funcional:** Usa tu propio peso corporal (ej. sentarse y levantarse de una silla) o bandas elásticas de baja resistencia. El objetivo es fortalecer los músculos para las actividades diarias.',
                '**Flexibilidad y Mente-Cuerpo:** Disciplinas como el **Tai Chi**, el **Qigong** y el **Yoga Restaurativo o Suave** son increíblemente beneficiosas. No solo mejoran la flexibilidad, sino que también calman el sistema nervioso.'
            ]},
            { type: 'paragraph', text: '**Qué Evitar (Generalmente):**' },
             { type: 'list', items: [
                '**Ejercicios de Alto Impacto:** Correr, saltar o aeróbicos de alto impacto suelen sobrecargar el sistema.',
                '**Ignorar el Dolor:** La mentalidad de "sin dolor no hay ganancia" es peligrosa. Aprende a diferenciar la molestia muscular normal del dolor agudo o quemante de la fibromialgia. Si este último aparece, es hora de parar.'
             ]}
        ],
        colorName: "amber",
    },
    {
        title: "Terapias Complementarias y Estilo de Vida",
        icon: 'leaf',
        details: [
            { type: 'paragraph', text: 'Este enfoque no reemplaza la medicina convencional, sino que la complementa, tratando a la persona en su totalidad. Siempre consulta a tu médico antes de probar nuevas terapias o suplementos.' },
            { type: 'paragraph', text: '**Nutrición y Dieta:**' },
            { type: 'list', items: [
                '**Dieta Antiinflamatoria:** Enfócate en alimentos integrales: pescado rico en omega-3 (salmón), aceite de oliva, frutas y verduras de colores, nueces y especias como la cúrcuma y el jengibre. Reduce o elimina azúcares añadidos, alimentos ultraprocesados y grasas trans.',
                '**Identificar Sensibilidades:** Algunas personas mejoran al eliminar gluten, lácteos o aditivos como el glutamato monosódico (GMS). Un diario de alimentos puede ayudar a identificar patrones personales.',
                '**Hidratación:** Mantenerse bien hidratado es fundamental para la función muscular y cognitiva.',
            ]},
            { type: 'paragraph', text: '**Suplementación (con supervisión médica):**' },
            { type: 'list', items: [
                '**Magnesio:** Puede ayudar con la tensión muscular, el sueño y el dolor. El citrato o glicinato de magnesio suelen ser mejor tolerados.',
                '**Vitamina D:** Los niveles bajos son comunes en personas con dolor crónico. Es importante analizar los niveles en sangre antes de suplementar.',
                '**Coenzima Q10:** Puede mejorar la energía a nivel celular (mitocondrial) y reducir la fatiga.',
                '**Melatonina:** Puede ayudar a regular el ciclo del sueño si se toma a dosis bajas.',
            ]},
            { type: 'paragraph', text: '**Terapias Mente-Cuerpo y Manuales:**' },
            { type: 'list', items: [
                '**Acupuntura:** Puede ayudar a modular las señales de dolor en el sistema nervioso y estimular la liberación de endorfinas.',
                '**Masoterapia Suave:** Técnicas como la liberación miofascial o el drenaje linfático pueden ser beneficiosas. Evita masajes de tejido profundo que pueden causar brotes de dolor.',
                '**Mindfulness y Meditación:** Estas prácticas entrenan al cerebro para observar el dolor sin reaccionar a él, reduciendo el sufrimiento asociado.',
                '**Hidroterapia:** Los baños tibios con sales de Epsom (sulfato de magnesio) relajan los músculos y calman el sistema nervioso.'
            ]}
        ],
        colorName: "teal",
    },
    {
        title: "Equipo de Salud Multidisciplinario",
        icon: 'userGroup',
        details: [
            { type: 'paragraph', text: 'El manejo exitoso de la fibromialgia requiere un equipo coordinado donde **tú eres el capitán**. Eres el miembro más importante de tu equipo de cuidado, y tu rol activo es insustituible. Idealmente, tu equipo podría incluir:' },
            { type: 'list', items: [
                '**Médico de Atención Primaria:** Es el coordinador central de tu salud, quien te deriva a los especialistas necesarios y maneja tu salud general.',
                '**Reumatólogo o Médico del Dolor:** A menudo son los especialistas que diagnostican y supervisan el plan de tratamiento, ajustando la medicación y descartando otras enfermedades.',
                '**Fisioterapeuta:** Tu \'entrenador de movimiento\', que te enseña a ejercitarte de forma segura y efectiva para reducir el dolor y mejorar la función.',
                '**Terapeuta Ocupacional:** El \'estratega de energía\', que te da herramientas para adaptar tus actividades diarias (pacing) y conservar tu energía para lo que más te importa.',
                '**Profesional de Salud Mental (Psicólogo/Psiquiatra):** El \'experto en afrontamiento\', que te proporciona herramientas (TCC, ACT) para manejar el impacto emocional del dolor crónico y calmar el sistema nervioso.',
                '**Nutricionista/Dietista:** Puede guiarte en la optimización de tu dieta para reducir la inflamación y mejorar los síntomas digestivos.',
                '**Grupos de Apoyo:** Conectar con otras personas que entienden por lo que estás pasando puede ser increíblemente validante y una fuente invaluable de consejos prácticos y apoyo emocional.',
            ]}
        ],
        colorName: "indigo",
    },
    {
        title: "Preguntas Frecuentes (FAQ)",
        icon: 'chatBubble',
        details: [
            { type: 'paragraph', text: '**¿La fibromialgia es progresiva? ¿Empeorará con el tiempo?**' },
            { type: 'paragraph', text: 'No, la fibromialgia no es una enfermedad degenerativa. No daña los músculos, articulaciones ni órganos. Sin embargo, los síntomas pueden fluctuar. Con un manejo proactivo y adecuado, muchas personas logran estabilizar o incluso mejorar significativamente su condición a largo plazo.' },
             { type: 'paragraph', text: '**¿La fibromialgia tiene cura?**' },
            { type: 'paragraph', text: 'Actualmente no existe una "cura", pero la **recuperación es posible**. Recuperación significa aprender a manejar los síntomas tan eficazmente que ya no controlan tu vida. Muchas personas logran reducir drásticamente sus síntomas y vivir una vida plena.' },
            { type: 'paragraph', text: '**¿Es una enfermedad real o "está en mi cabeza"?**' },
            { type: 'paragraph', text: 'Es 100% real. Es una condición neurológica con cambios medibles en el cerebro y el sistema nervioso. El estigma de que es "psicológica" es anticuado y dañino. El dolor se genera en el cerebro, pero eso no lo hace menos real; de hecho, lo hace más complejo.' },
            { type: 'paragraph', text: '**¿Qué es un "brote" o "crisis" de fibromialgia?**' },
            { type: 'paragraph', text: 'Un brote es un período de tiempo (días o semanas) en el que los síntomas empeoran significativamente. Puede ser desencadenado por estrés, sobreesfuerzo, falta de sueño, cambios climáticos o una infección. Aprender a identificar tus desencadenantes es clave para manejarlos.' },
            { type: 'paragraph', text: '**¿Por qué me siento peor cuando cambia el clima?**' },
            { type: 'paragraph', text: 'Muchas personas con fibromialgia reportan un empeoramiento con los cambios en la presión barométrica, la humedad y las temperaturas extremas. Se cree que un sistema nervioso hipersensible reacciona de forma exagerada a estos cambios ambientales.' },
            { type: 'paragraph', text: '**¿Por qué los analgésicos comunes no funcionan bien?**' },
            { type: 'paragraph', text: 'Porque el dolor de la fibromialgia no proviene de un daño o inflamación en los tejidos periféricos (donde actúan los antiinflamatorios como el ibuprofeno). El problema está en el "procesamiento" central del dolor en el sistema nervioso. Por eso, los medicamentos que actúan sobre los neurotransmisores cerebrales suelen ser más efectivos.' },
            { type: 'paragraph', text: '**¿Debo dejar de trabajar?**' },
            { type: 'paragraph', text: 'No necesariamente. Muchas personas continúan trabajando, a menudo con adaptaciones. La clave está en la gestión de la energía (pacing), la ergonomía y una comunicación abierta con el empleador. La terapia ocupacional puede ser de gran ayuda.' },
            { type: 'paragraph', text: '**¿Cómo le explico mi condición a familiares y amigos?**' },
            { type: 'paragraph', text: 'Es un gran desafío. Usa analogías simples, como "imagina tener gripe y no poder descansar nunca" o "es como si el volumen del dolor de mi cuerpo estuviera atascado en el máximo". Anímales a leer información fiable y explícales que, aunque no parezcas enfermo, tus limitaciones son reales y varían de un día para otro.' },
            { type: 'paragraph', text: '**¿Hay alguna dieta específica para la fibromialgia?**' },
            { type: 'paragraph', text: 'No hay una "dieta para la fibromialgia" única. Sin embargo, muchas personas se benefician de una dieta antiinflamatoria, similar a la mediterránea. Lo más importante es identificar y evitar los alimentos que personalmente te desencadenan síntomas.' },
            { type: 'paragraph', text: '**¿Es hereditario?**' },
            { type: 'paragraph', text: 'La fibromialgia tiende a darse en familias, lo que sugiere que puede haber una predisposición genética. Sin embargo, no es puramente genético; los factores ambientales (como traumas o infecciones) juegan un papel crucial en su desarrollo.' },
        ],
        colorName: "cyan",
    },
];

export const FIBROMYALGIA_SYMPTOMS = [
    'Fatiga',
    'Niebla mental',
    'Dolor de cabeza',
    'Ansiedad',
    'Depresión',
    'Problemas de sueño',
    'Rigidez',
    'Colon irritable (SII)',
    'Sensibilidad a la luz/ruido',
];

export const MOOD_OPTIONS: { [key: string]: string } = {
    'Feliz': '😊',
    'Normal': '🙂',
    'Irritable': '😠',
    'Ansioso': '😟',
    'Triste': '😢',
};

export const SLEEP_QUALITY_LABELS: { [key: number]: string } = {
    1: 'Muy Mala',
    2: 'Mala',
    3: 'Regular',
    4. 'Buena',
    5: 'Excelente',
};

export const ACTIVITY_LEVEL_LABELS: { [key: number]: string } = {
    1: 'Muy Bajo',
    2: 'Bajo',
    3: 'Moderado',
    4: 'Alto',
    5: 'Muy Alto',
};

export const SYMPTOM_SEVERITY_LABELS: { [key: number]: string } = {
    1: 'Leve',
    2: 'Moderado',
    3: 'Severo',
};

export const SYMPTOM_DURATION_OPTIONS = ['Intermitente', 'Constante'];
