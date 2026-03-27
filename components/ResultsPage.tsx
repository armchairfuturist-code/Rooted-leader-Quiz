import React, { useState } from 'react';
import type { QuizResults } from '../types';

// Access jsPDF from the global window object loaded by the script tag
declare global {
    interface Window {
        jspdf: any;
    }
}

const profileContent: { [key: string]: any } = {
  "The Resilient Navigator": {
    pattern: "Your responses suggest a nervous system with notable flexibility and capacity for regulation. You appear to maintain connection with your body's signals and can navigate emotional terrain without becoming overwhelmed or shutting down. This resilience isn't accidental—it reflects both your innate capacity and perhaps environments that have supported your nervous system's development.",
    pathwaysTitle: "3 Specific Pathways Your Body Is Ready to Heal",
    pathways: [
      "Deepening Interoceptive Precision: While you can sense your body's signals, there may be subtler layers of sensation and wisdom your body wishes to share. Practices that refine your ability to distinguish between different qualities of sensation can deepen your self-knowledge.",
      "Expanding Your Window Further: Even regulated nervous systems can expand their capacity. Exploring edges—safely approaching what would typically trigger mild activation—can increase your range and deepen your resilience.",
      "Supporting Others' Regulation: Your regulated state can become a resource for others. Learning to co-regulate consciously allows you to support loved ones while maintaining your own stability.",
    ],
    strengthsTitle: "2 Hidden Strengths Already Present in Your System",
    strengths: [
      "Your Ventral Vagal Capacity: Your ability to maintain social connection even during stress suggests a well-functioning social engagement system—this is the foundation of all healing work.",
      "Your Somatic Awareness: You haven't lost touch with your body's language, which means you have direct access to the wisdom that lives beneath conscious thought.",
    ],
    practicesTitle: "The Exact Regulation Practices That Match YOUR Pattern",
    practices: [
        "Nervous system expansion work: Deliberately exploring mild edges of activation or shutdown in safe contexts",
        "Advanced somatic practices: Somatic Experiencing, Hakomi, or other body-based modalities that work with subtle sensations",
        "Co-regulation training: Learning to hold space for others' nervous systems without losing your own center",
    ],
    challengesTitle: "Why Conventional Approaches May Not Have Worked",
    challenges: "Traditional therapy often assumes dysregulation and may not meet you where you are. You may need approaches that honor your existing capacity while still offering growth—work that explores expansion rather than repair.",
    noteTitle: "A Note on Your Journey",
    note: "Your nervous system's resilience is real, and it matters. Yet sometimes, those who appear most regulated may carry adaptive strategies so refined they're invisible even to themselves. There can be a difference between genuine ventral vagal safety and a highly sophisticated management system that looks like regulation.\n\nIf you sense there are deeper layers—patterns of accommodation, subtle disconnections, or ways you've learned to modulate yourself to maintain peace—these are worthy of gentle exploration. Real, lasting transformation often emerges not from fixing what's broken, but from discovering what we've hidden even from ourselves.\n\nWorking with a trauma-informed practitioner can help distinguish between authentic regulation and adaptive survival that masquerades as wellness. Sometimes the most regulated-appearing nervous systems carry the quietest wounds."
  },
  "The Vigilant Guardian": {
    pattern: "Your responses suggest a nervous system that has learned to stay alert, scanning your environment for potential threats or demands. This hypervigilance—the racing thoughts, difficulty relaxing, feeling \"wired but tired\"—isn't a character flaw or weakness. It's your nervous system's intelligent attempt to keep you safe in a world that once taught you that letting your guard down could be dangerous.\n\nThe sympathetic activation you experience may have origins you remember, or it may reach back to experiences before explicit memory formed. Either way, your body learned that constant readiness was necessary for survival. That this pattern persists now doesn't mean you're doing something wrong—it means your nervous system is still trying to protect you using strategies that once worked.",
    pathwaysTitle: "3 Specific Pathways Your Body Is Ready to Heal",
    pathways: [
      "Building Safety Signals: Your nervous system has become skilled at detecting danger. What it may need now is practice recognizing safety. This isn't about thinking positive thoughts—it's about tangible, embodied experiences that signal to your autonomic nervous system that rest is possible.",
      "Discharging Incomplete Responses: Sympathetic activation often contains frozen fight-or-flight responses that never completed. Your body may be holding energy that wants to discharge—through movement, trembling, or other somatic releases.",
      "Befriending Stillness: For a vigilant system, stillness can feel dangerous. Learning to tolerate moments of non-doing, non-achieving, non-monitoring requires gentle, gradual exposure to rest states while maintaining a sense of agency.",
    ],
    strengthsTitle: "2 Hidden Strengths Already Present in Your System",
    strengths: [
      "Your Mobilization Energy: The same activation that feels exhausting also contains tremendous life force. When channeled consciously, this energy can fuel creativity, purposeful action, and passionate engagement.",
      "Your Sensitivity: Hypervigilance means your nervous system picks up on subtle cues others miss. This sensitivity, when not overwhelming, is a gift—it can become intuition, empathy, and deep attunement.",
    ],
    practicesTitle: "The Exact Regulation Practices That Match YOUR Pattern",
    practices: [
      "Grounding and orienting exercises: Teaching your nervous system to locate safety in the present moment through sensory awareness",
      "Gentle movement practices: Yoga, qigong, or somatic movement that allows discharge without re-traumatization",
      "Vagal toning: Humming, gargling, singing, or other exercises that activate the vagus nerve and signal safety",
      "Boundary work: Learning to say no, set limits, and protect your energy—which paradoxically allows your nervous system to relax its internal vigilance",
    ],
    challengesTitle: "Why Conventional Approaches May Not Have Worked",
    challenges: "Traditional talk therapy, while valuable, often doesn't address the autonomic nervous system directly. If you've been told to \"just relax\" or \"stop overthinking,\" you've likely discovered this doesn't work—because the activation isn't happening at the level of conscious thought.\n\nCognitive approaches assume you can think your way into safety, but your nervous system speaks a different language. It responds to embodied experience, to rhythm, to co-regulation with safe others—not to intellectual understanding alone.",
    noteTitle: "A Note on Your Journey",
    note: "Living in perpetual activation is exhausting, and you may have been in this state so long you've forgotten what ease feels like. Perhaps you've been told you're \"high-strung\" or \"anxious\" or \"intense\"—labels that can make you feel there's something inherently wrong with you.\n\nThere isn't.\n\nYour nervous system adapted brilliantly to circumstances that required vigilance. The question now isn't \"What's wrong with me?\" but \"What happened to me—and what does my nervous system need now to know those circumstances have changed?\"\n\nThis kind of somatic unwinding rarely happens through information alone. Reading about regulation is different from experiencing it. Working with someone who understands nervous system healing—someone who can help you navigate the vulnerable territory between hyperactivation and genuine rest—may be the difference between understanding your pattern and actually transforming it.\n\nThe pathway from vigilance to ease exists, but it requires more than knowledge. It requires relationship, embodied practice, and someone who can hold steady while your system learns a new way of being."
  },
  "The Quiet Retreater": {
    pattern: "Your responses suggest a nervous system that has learned to protect you through withdrawal—shutting down, going numb, or dissociating when life feels overwhelming. This dorsal vagal response is your body's oldest survival strategy, what some call \"playing dead\" or conservation mode.\n\nThis shutdown isn't chosen consciously. It's an autonomic response that happens when your system perceives a threat it cannot fight or flee from. Perhaps there were times when the only safety available was to disappear, to feel nothing, to float above what was happening. Your nervous system learned this strategy brilliantly—and may still be using it even when the original circumstances have changed.\n\nThe numbness, the spacing out, the feeling of watching yourself from a distance—these aren't signs of weakness or apathy. They're signs of a nervous system that protected you in the only way available.",
    pathwaysTitle: "3 Specific Pathways Your Body Is Ready to Heal",
    pathways: [
      "Gentle Re-Engagement: Your system learned that shutting down was safer than staying present. Now it may be ready to discover that presence—in small, titrated doses—is bearable. This isn't about forcing yourself back online; it's about creating conditions where your system chooses to emerge.",
      "Restoring Mobilization Capacity: Dorsal shutdown often happens when the sympathetic system (fight/flight) couldn't complete its protective responses. Your body may need to access healthy mobilization—appropriate anger, boundary-setting, moving toward what you want—before it can trust full presence.",
      "Building a Bridge Back to Connection: Withdrawal serves to protect you from painful relationship experiences. Healing may involve discovering that not all connection requires you to abandon yourself—that you can remain present with others while also remaining present with you.",
    ],
    strengthsTitle: "2 Hidden Strengths Already Present in Your System",
    strengths: [
      "Your Preservation Wisdom: The ability to conserve energy and withdraw from harm has kept you alive. This same wisdom, when conscious, becomes discernment—knowing when to engage and when to protect your resources.",
      "Your Depth: Those who retreat often do so because they feel deeply. The sensitivity that makes overwhelm more likely also enables profound connection, creativity, and insight when safety allows it to emerge.",
    ],
    practicesTitle: "The Exact Regulation Practices That Match YOUR Pattern",
    practices: [
      "Gradual embodiment practices: Gentle body scan, progressive muscle relaxation, or other methods that help you tolerate being \"back in your body\"",
      "Activation before settling: Sometimes movement or purposeful sympathetic activation (shaking, pushing against walls) needs to happen before your system will release dorsal collapse",
      "Co-regulation: The presence of a safe, regulated other can help draw your system back online when it feels stuck in shutdown",
      "Small, achievable actions: Building agency through tiny choices and completed actions helps counter the immobilization response",
    ],
    challengesTitle: "Why Conventional Approaches May Not Have Worked",
    challenges: "Conventional therapy often requires consistent engagement, emotional expression, and verbal processing—precisely what's difficult when your nervous system is in shutdown. If you've been labeled \"resistant\" or told you're \"not trying hard enough,\" this may have compounded your system's belief that staying present isn't safe.\n\nApproaches that push too hard for feeling or expression can trigger more shutdown. What may work better is meeting you where you are—honoring the withdrawal as protective—and creating such exquisite safety that your system gradually chooses to emerge on its own.",
    noteTitle: "A Note on Your Journey",
    note: "Living in partial shutdown can feel like watching life happen behind glass—you're there, but not quite there. You may appear calm or easygoing to others, while inside you feel disconnected, foggy, or emptied out. Perhaps you've wondered if you'll ever feel fully alive.\n\nYou can.\n\nBut the pathway from shutdown to aliveness isn't through force or willpower. It's through creating conditions of such profound safety that your nervous system no longer needs to protect you by numbing you out. This is delicate work—pushing too hard triggers more shutdown, while too little support leaves you stranded.\n\nThis emergence from dorsal collapse often requires the steady presence of someone who understands these patterns intimately. Your system learned to disappear in the context of relationships; it may need the context of a genuinely safe relationship to learn it can stay.\n\nReading about this pattern is different from having someone help you navigate back to presence. The journey from numb to feeling, from frozen to flowing, requires more than information—it requires accompaniment by someone who won't abandon you when the terrain gets difficult."
  },
  "The Sensitive Empath": {
    pattern: "Your responses suggest a nervous system with a narrow window of tolerance—meaning you move quickly between states of hyperactivation (overwhelm, anxiety, racing thoughts) and hypoactivation (shutdown, numbness, disconnection). Where others might have a wide range of emotions they can experience while staying present, your system may swing rapidly between \"too much\" and \"too little.\"\n\nThis isn't a character flaw. A narrow window of tolerance often develops when the nervous system has been repeatedly pushed beyond its capacity—particularly in developmental years when the window was still forming. Your sensitivity may also be constitutional; some nervous systems are simply more finely tuned, picking up on subtleties others miss.\n\nThe challenge is that this sensitivity, while potentially a gift, can feel overwhelming when your system lacks the capacity to modulate intensity. You may find yourself avoiding situations not because you don't want connection or experience, but because your nervous system can't reliably stay within a manageable range.",
    pathwaysTitle: "3 Specific Pathways Your Body Is Ready to Heal",
    pathways: [
      "Expanding Your Window of Tolerance: This isn't about gettingside of your sensitivity—it's about increasing your capacity to stay present with a wider range of experience. Think of it as expanding the container, not changing what fills it.",
      "Developing a Neutral Zone: Your system may have learned that everything is either danger or relief, with little territory in between. Creating a \"neutral zone\"—experiences that are neither activating nor numbing—can help your nervous system discover that not everything requires a strong response.",
      "Befriending Your Oscillations: Rather than fighting the swings between states, learning to recognize and work with them consciously can transform chaos into information. Your system's movement between activation and shutdown may be trying to tell you something.",
    ],
    strengthsTitle: "2 Hidden Strengths Already Present in Your System",
    strengths: [
      "Your Perceptual Acuity: You notice what others miss—subtle shifts in energy, unspoken emotions, the felt sense of environments. When your window expands, this sensitivity becomes a profound gift.",
      "Your Authenticity Potential: Because you feel things intensely, you have access to genuine response. Many people have such wide windows they've lost touch with authentic feeling—you haven't. You're closer to your truth, even when it's uncomfortable.",
    ],
    practicesTitle: "The Exact Regulation Practices That Match YOUR Pattern",
    practices: [
      "Pendulation exercises: Deliberately moving attention between activated and settled states to increase tolerance for both",
      "Sensory modulation: Learning which sensory inputs calm or activate you, so you can consciously influence your state",
      "Pacing and titration: Approaching triggering material or experiences in tiny doses, building capacity gradually",
      "Dual awareness practices: Learning to track both the content of experience and your nervous system's response simultaneously",
    ],
    challengesTitle: "Why Conventional Approaches May Not Have Worked",
    challenges: "Traditional therapy often assumes you can sit with difficult material for 50-minute sessions. For someone with a narrow window, this can be re-traumatizing. You may have felt worse after sessions, then been told you need to \"lean into discomfort\"—advice that can damage sensitive nervous systems further.\n\nApproaches that honor your system's current capacity—that work in small doses, that prioritize stabilization over catharsis—may be what you actually need. Healing doesn't require you to flood your system; it requires you to gently expand your capacity to be with life.",
    noteTitle: "A Note on Your Journey",
    note: "Living with a narrow window of tolerance can be exhausting and isolating. You may feel \"too sensitive\" for this world, or wonder why others seem to navigate life's challenges with such ease. Perhaps you've been told to \"toughen up\" or \"not take things so personally.\"\n\nThis advice misses the point entirely.\n\nYour sensitivity isn't a choice you're making—it's how your nervous system is currently organized. And while expanding your window is possible, it happens through attunement and gradual capacity-building, not through forcing yourself into experiences your system isn't ready for.\n\nThe delicate work of expanding your window of tolerance often requires someone who understands nervous system healing at a somatic level. It's easy to inadvertently overwhelm a sensitive system; it takes skill and attunement to help it gradually expand without collapsing it.\n\nThis transformation—from easily overwhelmed to resiliently sensitive—requires more than understanding. It requires the precise calibration that comes from working with someone trained in reading nervous systems and titrating experience carefully."
  },
  "The Disconnected Achiever": {
    pattern: "Your responses suggest you may have learned to live primarily \"in your head\"—thinking, planning, analyzing, achieving—while maintaining significant distance from your body's signals and wisdom. This mind-body split is remarkably common in achievement-oriented cultures that reward productivity over presence, doing over being.\n\nYou may be highly functional, even successful by external measures. Yet you might notice physical symptoms that seem to come from nowhere—headaches, digestive issues, muscle tension—or realize you've pushed past hunger, exhaustion, or emotional needs without noticing until your body forces you to stop.\n\nThis disconnection from interoception (the ability to sense your body's internal state) isn't laziness or lack of self-awareness. It's often a protective strategy that develops when feeling the body's signals was too painful, overwhelming, or inconvenient to survival or success.",
    pathwaysTitle: "3 Specific Pathways Your Body Is Ready to Heal",
    pathways: [
      "Rebuilding Interoceptive Awareness: Your body has been sending signals you've learned not to hear. The pathway involves slowly, gently turning your attention inward—noticing sensation without needing to fix or change it—until listening to your body becomes as natural as it once was.",
      "Valuing Being Over Doing: Achievement may have become the metric of your worth, making rest or non-productivity feel dangerous. Healing may involve discovering that your value doesn't require constant doing—that you have inherent worth even in stillness.",
      "Integrating Mind and Body: The split between thinking and feeling served a purpose. Now the work is reunion—discovering that your body holds wisdom your mind alone cannot access, and that integrating both creates a fuller, more authentic way of being.",
    ],
    strengthsTitle: "2 Hidden Strengths Already Present in Your System",
    strengths: [
      "Your Capacity for Focus: The same ability to override body signals allows intense concentration and achievement. When reunited with somatic awareness, this becomes integrated presence—you can achieve without abandoning yourself.",
      "Your Resilience: You've maintained function despite disconnection from your body's needs. This resilience, when combined with embodied awareness, becomes sustainable strength rather than depleting endurance.",
    ],
    practicesTitle: "The Exact Regulation Practices That Match YOUR Pattern",
    practices: [
      "Basic body scanning: Regular, gentle attention to sensation—starting with neutral or pleasant sensations before approaching difficult ones",
      "Movement practices that require body awareness: Yoga, dance, martial arts, or other modalities where you can't rely on thinking alone",
      "Naming and tracking body sensations: Building vocabulary for internal experience (\"tightness,\" \"warmth,\" \"fluttering\") to make the invisible visible",
      "Deliberate pauses: Regular moments to check in with your body throughout the day—hunger, tiredness, tension, comfort",
    ],
    challengesTitle: "Why Conventional Approaches May Not Have Worked",
    challenges: "Traditional talk therapy can reinforce the mind-body split by keeping you in your head, analyzing and understanding without necessarily feeling or embodying change. You may have gained significant insight about your patterns while the patterns themselves remained unchanged.\n\nPurely cognitive approaches, meditation practices that emphasize transcending the body, or achievement-focused coaching may all inadvertently strengthen the very disconnection that's limiting you. What may work better is somatic therapy that brings you back into your body, where transformation can actually occur.",
    noteTitle: "A Note on Your Journey",
    note: "You may have succeeded by many measures while simultaneously feeling something crucial is missing—an aliveness, an authenticity, a sense of being fully present in your own life. The disconnection that once protected you or helped you achieve may now be the very thing preventing you from experiencing the life you've built.\n\nReuniting with your body isn't about becoming less capable or successful—it's about discovering that achievement without embodiment is exhausting, while embodied achievement is sustainable and genuinely satisfying.\n\nThis journey from head to heart, from thinking to feeling, from doing to being often requires more than information. Your mind already understands the concept; it's your body that needs to relearn trust, to discover it's safe to feel, to know it won't be overwhelmed or ignored if it speaks.\n\nWorking with someone who can help you navigate this reunion—who can help you approach your body with curiosity rather than control, who can help you tolerate the vulnerability of feeling—may be what allows this integration to actually happen rather than remaining another concept to understand."
  },
  "The Isolated Seeker": {
    pattern: "Your responses suggest a nervous system that struggles to feel genuinely safe in connection, even when you may long for it deeply. The social engagement system—the part of your nervous system that allows you to feel safe with others, to trust, to experience authentic connection—may have learned that relationship itself is a source of threat.\n\nThis isn't about being introverted or preferring solitude. It's about a nervous system that cannot fully relax in the presence of others, that maintains hypervigilance or withdrawal even with people you care about, that may mask or perform rather than reveal your authentic self.\n\nThe isolation this creates is often invisible to others. You may appear sociable, competent, even warm—while inside you feel fundamentally alone, unable to let anyone truly see you or unable to believe that others' care is genuine or sustainable.",
    pathwaysTitle: "3 Specific Pathways Your Body Is Ready to Heal",
    pathways: [
      "Repairing the Social Engagement System: Your ventral vagal complex—the newest part of your nervous system that enables connection—may need explicit support to come back online. This happens through experiences of safe, attuned relationship, not through willpower or understanding.",
      "Distinguishing Past from Present: Your nervous system may be responding to current relationships as if they carry the same dangers as past ones. Learning to help your system recognize \"this person, here, now\" as potentially different requires somatic attention, not just cognitive recognition.",
      "Learning Trust as a Practice: For those whose early experiences taught them that trust is dangerous, building trust becomes a deliberate practice—starting tiny, staying conscious, gradually expanding the circle of those your nervous system can relax with.",
    ],
    strengthsTitle: "2 Hidden Strengths Already Present in Your System",
    strengths: [
      "Your Self-Sufficiency: You've learned to meet your own needs, to survive without the support that should have been available. This is real strength, even as healing may involve discovering you don't have to do everything alone.",
      "Your Protective Discernment: Your nervous system's caution around connection likely comes from real experience. This capacity to sense when relationships are unsafe is valuable—healing involves refining it, not eliminating it.",
    ],
    practicesTitle: "The Exact Regulation Practices That Match YOUR Pattern",
    practices: [
      "Co-regulation experiences: Deliberately practicing being in the presence of safe others and noticing your nervous system's response",
      "Polyvagal-informed therapy: Working with someone trained in understanding and repairing social engagement system function",
      "Gradual self-revelation: Practicing showing small, true parts of yourself to safe people and noticing you survive the vulnerability",
      "Ventral vagal toning: Facial expression exercises, prosody practice, and other specific techniques that activate social engagement",
    ],
    challengesTitle: "Why Conventional Approaches May Not Have Worked",
    challenges: "Traditional therapy that focuses on insight (\"understanding why you struggle with trust\") doesn't repair the autonomic nervous system's social engagement function. You may understand perfectly why connection feels dangerous while still being unable to relax into it.\n\nAdvice to \"just open up\" or \"let people in\" misses the point that your nervous system is driving these patterns below conscious control. Similarly, relationship advice that assumes your social engagement system is functioning won't help when the system itself needs repair.",
    noteTitle: "A Note on Your Journey",
    note: "The loneliness of living behind walls—even when those walls once protected you—is a particular kind of suffering. You may watch others connect with apparent ease and wonder what's wrong with you, why you can't simply let people in, why every relationship feels somehow conditional or performative.\n\nNothing is wrong with you.\n\nYour nervous system adapted to environments where connection was dangerous, unpredictable, or unavailable. The isolation you experience now is your system still trying to protect you using strategies that once made sense. The question isn't \"Why can't I just trust?\" but \"What does my nervous system need to discover that connection can be different now?\"\n\nThis repair of the social engagement system is among the most delicate nervous system healing work. It requires the very thing that feels most dangerous—genuine relationship—to occur within conditions of exquisite safety. It requires someone who won't push too hard, won't withdraw when you need to retreat, and won't personalize your system's protective responses.\n\nReading about connection cannot substitute for experiencing it. Working with a practitioner who understands attachment and nervous system healing—who can offer the precisely attuned relationship your system needs to discover trust is possible—may be the difference between understanding isolation and actually experiencing authentic connection."
  },
  "The Adaptive Survivor": {
    pattern: "Your responses suggest a nervous system displaying complex dysregulation across multiple domains—interoception, emotional regulation, social engagement, and stress response patterns. This isn't one simple pattern but rather an intricate web of adaptive strategies your system has woven to navigate environments that may have been unpredictable, demanding, or overwhelming.\n\nYou've survived—and this matters enormously. Yet survival strategies that work brilliantly in crisis often become limitations in safety. Your nervous system may be running multiple protective programs simultaneously, leaving you exhausted by the sheer effort of managing your internal state while also meeting external demands.\n\nThe complexity of your pattern suggests your nervous system has encountered complexity in your environment. Perhaps inconsistent caregiving, multiple types of stress, or prolonged challenges without adequate support. Your system adapted impressively—and now may be ready to move beyond mere survival toward genuine thriving.",
    pathwaysTitle: "3 Specific Pathways Your Body Is Ready to Heal",
    pathways: [
      "Simplifying the System: With multiple dysregulation patterns active, healing may begin by addressing the most primary pattern—often the one that developed earliest or creates the most difficulty. Your nervous system may need help prioritizing which patterns to address first.",
      "Building a Foundation of Safety: Before working with specific symptoms or patterns, your system may need experiences of basic safety—moments where nothing needs to be managed, defended against, or figured out. This foundation allows other healing to occur.",
      "Integration Over Elimination: Rather than trying to eliminate each survival strategy, the work may be integrating them—discovering you can access fight, flight, freeze, and fawn responses when appropriate while not being controlled by them reflexively.",
    ],
    strengthsTitle: "2 Hidden Strengths Already Present in Your System",
    strengths: [
      "Your Adaptability: The complexity of your pattern demonstrates remarkable nervous system flexibility. You've learned to survive using multiple strategies—this same adaptability can become your greatest asset in healing.",
      "Your Persistence: You're still here, still functioning, despite significant nervous system dysregulation. This resilience—the part of you that hasn't given up—is the very resource you'll draw on for transformation.",
    ],
    practicesTitle: "The Exact Regulation Practices That Match YOUR Pattern",
    practices: [
      "Comprehensive nervous system assessment: Understanding which patterns are primary and which are secondary helps prioritize healing efforts",
      "Stabilization before processing: Building resources, safety, and regulation capacity before addressing specific traumas or difficulties",
      "Multi-modal approach: Your complex pattern may benefit from combining somatic therapy, movement practices, and possibly adjunct supports like bodywork or neurofeedback",
      "Pacing awareness: Learning to recognize when you're doing too much or pushing too hard—even in healing itself",
    ],
    challengesTitle: "Why Conventional Approaches May Not Have Worked",
    challenges: "Single-modality approaches (just talk therapy, just medication, just meditation) often fall short with complex presentations. Your nervous system's sophistication requires sophisticated response—practitioners who understand trauma, attachment, nervous system regulation, and how these intersect.\n\nAdditionally, approaches that pathologize your symptoms rather than understanding them as adaptive can leave you feeling broken rather than recognizing your system's intelligence. You don't need fixing; you need updating—helping your nervous system discover that the environments requiring such complex adaptation have changed.",
    noteTitle: "A Note on Your Journey",
    note: "Living with complex nervous system dysregulation can feel overwhelming. You may have tried many approaches, read countless books, worked with multiple practitioners—gaining understanding without necessarily experiencing the transformation you seek. Perhaps you've wondered if healing is actually possible for you, if your patterns are too entrenched, if you'll ever feel at ease.\n\nHealing is possible.\n\nBut the pathway for complex nervous system patterns is rarely linear. It requires patience with setbacks, compassion for the survival strategies that kept you alive, and often the support of someone who can help you navigate the intricate territory of your particular system.\n\nWorking with complex nervous system presentations is specialized work. It requires practitioners who understand trauma deeply, who can work somatically, who recognize when to push forward and when to consolidate, who can help you distinguish between patterns that need addressing and patterns that will resolve once primary issues are healed.\n\nThis isn't work that happens through information alone, through trying harder, or through forcing yourself into practices your system isn't ready for. It happens through relationship with someone skilled in this specific terrain—someone who can help you move from survival mode to genuine aliveness, from managing symptoms to experiencing wholeness."
  },
  "The Awakening Healer": {
    pattern: "Your responses suggest significant nervous system dysregulation across multiple domains. This isn't a comfortable thing to recognize, yet your awareness of these patterns already places you on the threshold of potential transformation. Many people live for decades in severe dysregulation without recognizing it; your willingness to see your patterns honestly is itself a form of courage.\n\nLiving in this degree of dysregulation is exhausting. Your nervous system may oscillate rapidly between shutdown and hyperactivation, making it difficult to predict how you'll feel or function day to day. Connection with others may feel nearly impossible, your body may seem like a stranger or even an enemy, and moving forward with life goals can feel like pushing through concrete.\n\nYet here's what's also true: nervous systems have profound capacity for healing when given the right conditions. The severity of dysregulation doesn't determine the possibility of change—it simply indicates the level of support and specific intervention that may be needed.",
    pathwaysTitle: "3 Specific Pathways Your Body Is Ready to Heal",
    pathways: [
      "Establishing Basic Safety: Before addressing specific symptoms or traumas, your nervous system needs foundational experiences of safety—predictable support, absence of demand, permission to be exactly as you are. This isn't about fixing; it's about finally being held.",
      "Addressing Survival Mode: Your system is likely in chronic survival activation. The first pathway isn't processing past trauma but helping your system recognize that the immediate threat has passed—that you're surviving now in ways your body hasn't fully registered.",
      "Building Stabilization Resources: With this level of dysregulation, attempting deep trauma work too quickly can be destabilizing. Your system may need months of stabilization—building resources, practicing regulation, creating safety—before processing specific difficulties.",
    ],
    strengthsTitle: "2 Hidden Strengths Already Present in Your System",
    strengths: [
      "Your Awareness: Many people with this level of dysregulation remain unaware, blaming themselves or believing nothing can change. Your recognition of these patterns as nervous system responses rather than character flaws is profound.",
      "Your Survival: The fact that you've continued functioning with this degree of nervous system challenge speaks to a core resilience your conscious mind may not recognize. That strength remains available for your healing.",
    ],
    practicesTitle: "The Exact Regulation Practices That Match YOUR Pattern",
    practices: [
      "Professional somatic support: This level of dysregulation typically requires working with practitioners trained in trauma and nervous system healing—Somatic Experiencing, Sensorimotor Psychotherapy, or similar approaches",
      "Medication evaluation: While not always necessary, sometimes nervous system dysregulation at this level benefits from psychiatric support alongside somatic work",
      "Stabilization-focused practices: Body-based grounding, orienting to safety, resource-building exercises done regularly",
      "Trauma-informed community: Group work or peer support from others healing nervous system trauma can provide co-regulation and reduce isolation",
    ],
    challengesTitle: "Why Conventional Approaches May Not Have Worked",
    challenges: "Standard talk therapy, while valuable, often cannot address nervous system dysregulation at this level. If you've felt worse after therapy, been told your problems are \"in your head,\" or cycled through multiple practitioners without improvement, this doesn't mean you're unfixable—it means you haven't yet found approaches that match your nervous system's actual needs.\n\nAdditionally, well-meaning advice to meditate, exercise, or \"think positive\" can feel invalidating when your nervous system is in survival mode. These practices can be helpful, but only after establishing basic stabilization—trying them too soon is like trying to garden while your house is on fire.",
    noteTitle: "A Note on Your Journey",
    note: "If you're reading this, you may be experiencing some of the hardest aspects of being human—the feeling that your own body is working against you, that connection is impossibly risky, that life is something to endure rather than experience. You may have internalized messages that you're broken, too much, too sensitive, beyond help.\n\nNone of this is true.\n\nWhat is true is that your nervous system encountered circumstances it couldn't process or integrate, and it adapted in ways that made survival possible but that may now be limiting your ability to truly live. This isn't your fault, and it isn't permanent.\n\nHealing from this degree of nervous system dysregulation is possible, but it's not work that happens alone or through information alone. It's not about reading the right book or trying harder or having more discipline.\n\nThis level of healing requires the one thing that may feel most challenging: asking for help.\n\nSpecifically, it requires working with practitioners who specialize in trauma and nervous system healing, who understand that your symptoms aren't character flaws but intelligent adaptations, who won't push you beyond your window of tolerance while also not leaving you stranded in your current state.\n\nYou've been in survival mode long enough. Moving from surviving to thriving, from dysregulation to regulation, from isolation to connection—this transformation is possible. It requires the right support, trauma-informed practices, and often time measured in months or years rather than weeks.\n\nBut it is possible.\n\nAnd you don't have to do it alone."
  }
};


const ConfettiPiece: React.FC<{ initialX: number; delay: number }> = ({ initialX, delay }) => {
    const colors = ['bg-primary-blue', 'bg-secondary-blue', 'bg-sage', 'bg-accent'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 12 + 6;
  
    return (
      <div
        className={`absolute rounded-full animate-confetti ${color}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${initialX}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${Math.random() * 2 + 3}s`
        }}
      ></div>
    );
};

const ConfettiExplosion: React.FC = () => {
    const [pieces, setPieces] = React.useState<React.ReactNode[]>([]);
  
    React.useEffect(() => {
      const newPieces = Array.from({ length: 50 }).map((_, i) => (
        <ConfettiPiece key={i} initialX={Math.random() * 100} delay={Math.random() * 0.5} />
      ));
      setPieces(newPieces);
    }, []);
  
    return <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">{pieces}</div>;
};

interface ResultsPageProps {
  results: QuizResults;
}

const XIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  );
  
  const FacebookIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
    </svg>
  );
  
  const LinkedInIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
    </svg>
  );

const ResultsPage: React.FC<ResultsPageProps> = ({ results }) => {
    const { dominantPattern, patternDescription, patternIcon, totalScore } = results;
    const [email, setEmail] = useState('');
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const shareUrl = window.location.href;
    const shareText = `I just discovered my nervous system pattern is "${dominantPattern}". Take this 3-minute, science-based quiz to find yours and start your healing journey!`;
    const shareHashtags = "NervousSystem,InnerHealerQuiz,Polyvagal";

    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(shareHashtags)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`I Discovered My Nervous System Pattern!`)}&summary=${encodeURIComponent(shareText)}`;

    const generatePdf = () => {
        // FIX: The line number in the error report was likely incorrect. This change makes the instantiation
        // of jsPDF more robust by directly accessing the constructor from the window object within the function scope,
        // which can prevent potential issues with variable shadowing or incorrect type inference from a global 'any' type.
        const { jsPDF } = (window as any).jspdf;
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });
        const content = profileContent[dominantPattern];
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        const page_width = doc.internal.pageSize.getWidth();
        const margin = 15;
        const max_width = page_width - margin * 2;
        let y = 20;

        const checkPageBreak = () => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        };

        const printText = (text: string, options: { fontStyle?: string; fontSize?: number; x?: number; isTitle?: boolean; align?: 'left' | 'center' | 'right' }) => {
            const { fontStyle = 'normal', fontSize = 11, x = margin, isTitle = false, align = 'left' } = options;
            doc.setFont('Helvetica', fontStyle);
            doc.setFontSize(fontSize);
            
            checkPageBreak();

            const splitText = doc.splitTextToSize(text, max_width);
            doc.text(splitText, align === 'center' ? page_width / 2 : x, y, { align: align });
            
            const textHeight = doc.getTextDimensions(splitText).h;
            y += textHeight + (isTitle ? 4 : 3);
        };

        const printList = (items: string[]) => {
            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(11);
            items.forEach((item: string) => {
                checkPageBreak();
                const splitItem = doc.splitTextToSize(`• ${item}`, max_width - 5);
                doc.text(splitItem, margin + 5, y);
                y += doc.getTextDimensions(splitItem).h + 2;
            });
        };
        

        // --- PDF Content ---
        printText(dominantPattern, { fontSize: 22, fontStyle: 'bold', align: 'center', isTitle: true });
        y += 2;
        printText(`Regulation Score: ${totalScore}/88`, { fontSize: 14, align: 'center' });
        y += 2;
        printText(`Date of Assessment: ${today}`, { fontSize: 11, align: 'center' });
        y += 10;
        
        doc.line(margin, y, page_width - margin, y);
        y+= 10;

        if (content) {
            printText("Your Nervous System Pattern", { fontSize: 16, fontStyle: 'bold', isTitle: true });
            printText(content.pattern, { fontSize: 12 });
            y += 5;

            printText(content.pathwaysTitle, { fontSize: 14, fontStyle: 'bold', isTitle: true });
            printList(content.pathways);
            y += 5;

            printText(content.strengthsTitle, { fontSize: 14, fontStyle: 'bold', isTitle: true });
            printList(content.strengths);
            y += 5;

            printText(content.practicesTitle, { fontSize: 14, fontStyle: 'bold', isTitle: true });
            printList(content.practices);
            y += 5;
            
            printText(content.challengesTitle, { fontSize: 14, fontStyle: 'bold', isTitle: true });
            printText(content.challenges, {});
            y += 5;
            
            printText(content.noteTitle, { fontSize: 14, fontStyle: 'bold', isTitle: true });
            printText(content.note, {});
        }
        
        doc.addPage();
        y = 20;

        printText("Important Information & Disclaimer", { fontSize: 16, fontStyle: 'bold', isTitle: true });
        printText("Educational Purposes Only", { fontSize: 12, fontStyle: 'bold' });
        printText("This assessment and the information provided are for educational and self-exploration purposes only. They are not intended to diagnose, treat, cure, or prevent any medical or psychological condition.", {});
        y += 3;
        printText("Not a Substitute for Professional Care", { fontSize: 12, fontStyle: 'bold' });
        printText("This assessment does not replace consultation with qualified healthcare providers, mental health professionals, or medical practitioners. If you are experiencing significant distress, trauma symptoms, or health concerns, please seek appropriate professional support.", {});
        y += 3;
        printText("Individual Variation", { fontSize: 12, fontStyle: 'bold' });
        printText("Nervous system patterns are complex and individual. This assessment provides general information based on your responses, but cannot capture the full complexity of your unique experience or history.", {});
        y += 3;
        printText("No Therapeutic Relationship", { fontSize: 12, fontStyle: 'bold' });
        printText("Completion of this assessment does not establish a therapeutic or professional relationship. Any information provided is general in nature and not personalized medical or psychological advice.", {});
        y += 3;
        printText("Consultation Recommended", { fontSize: 12, fontStyle: 'bold' });
        printText("If you recognize patterns of significant dysregulation, trauma responses, or nervous system challenges, working with a trauma-informed therapist, somatic practitioner, or healthcare provider is strongly encouraged.", {});
        y += 3;
        printText("Self-Determination", { fontSize: 12, fontStyle: 'bold' });
        printText("You are the expert on your own experience. Use this information as one input among many as you make decisions about your health, wellbeing, and healing journey.", {});
        y += 3;
        printText("Emergency Resources", { fontSize: 12, fontStyle: 'bold' });
        printText("If you are in crisis or experiencing thoughts of self-harm, please contact emergency services or crisis support immediately:\n- National Suicide Prevention Lifeline: 988 (US)\n- Crisis Text Line: Text HOME to 741741\n- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/", {});
        y += 10;
        printText("This assessment was created with respect for the complexity of human nervous systems and the wisdom of your lived experience. May it serve your journey toward greater wholeness and wellbeing.", { fontStyle: 'italic' });
        

        doc.save(`Your_Inner_Healer_Profile_${dominantPattern.replace(/\s/g, '_')}.pdf`);
    };

    return (
        <div className="relative gradient-bg-results w-full min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans text-text-dark overflow-y-auto">
            <ConfettiExplosion />
            <div className="relative z-10 w-full max-w-2xl mx-auto bg-cream/80 backdrop-blur-lg p-6 sm:p-10 md:p-12 my-12 rounded-2xl shadow-soft text-center">
                <div className="text-7xl sm:text-8xl mb-4">{patternIcon}</div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-accent mb-2">You Are: {dominantPattern}</h1>
                <div className="inline-block bg-sage/50 text-text-dark font-medium py-1 px-4 rounded-full text-sm sm:text-base mb-6">
                    Regulation Score: {totalScore}/88
                </div>
                <p className="text-base sm:text-lg text-text-light max-w-xl mx-auto mb-8 leading-relaxed" style={{ lineHeight: 1.8 }}>
                    {patternDescription}
                </p>

                <div className="my-8">
                    <h3 className="text-lg font-medium text-text-dark mb-4">Share Your Journey</h3>
                    <div className="flex justify-center items-center gap-4">
                        <a
                            href={twitterShareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Twitter"
                            className="w-12 h-12 rounded-full bg-sage/60 text-text-dark flex items-center justify-center shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5 transition-all"
                        >
                            <XIcon />
                        </a>
                        <a
                            href={facebookShareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                            className="w-12 h-12 rounded-full bg-sage/60 text-text-dark flex items-center justify-center shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5 transition-all"
                        >
                            <FacebookIcon />
                        </a>
                        <a
                            href={linkedInShareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on LinkedIn"
                            className="w-12 h-12 rounded-full bg-sage/60 text-text-dark flex items-center justify-center shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5 transition-all"
                        >
                            <LinkedInIcon />
                        </a>
                    </div>
                </div>

                <hr className="border-t-2 border-sage/50 w-24 mx-auto mb-8" />

                <div className="text-left max-w-md mx-auto mb-10">
                    <h2 className="text-xl sm:text-2xl font-medium text-text-dark mb-6 text-center">Your Unique Inner Healer Profile Reveals:</h2>
                    <ul className="space-y-4 text-text-light">
                        <li className="flex items-start"><span className="mr-3 text-xl">✨</span> 3 specific pathways your body is ready to heal</li>
                        <li className="flex items-start"><span className="mr-3 text-xl">🌱</span> 2 hidden strengths already present in your system</li>
                        <li className="flex items-start"><span className="mr-3 text-xl">🧭</span> The exact regulation practices that match YOUR pattern</li>
                        <li className="flex items-start"><span className="mr-3 text-xl">💡</span> Why conventional approaches may not have worked for you</li>
                    </ul>
                </div>
                
                <div className="space-y-4 mb-10 max-w-sm mx-auto">
                    <a 
                        href="https://theintegrativepractitioner.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full bg-accent text-white py-3 px-6 rounded-lg font-medium text-center shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5 transition-all"
                    >
                        Learn More About The Integrative Practitioner
                    </a>
                    <a 
                        href="https://substack.com/@theintegrativepractitioner" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full bg-white text-accent border-2 border-accent py-3 px-6 rounded-lg font-medium text-center shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5 transition-all"
                    >
                        Get Weekly Healing Insights on Substack
                    </a>
                </div>

                <div className="max-w-lg mx-auto p-6 border-2 border-sage rounded-2xl text-left bg-white/50">
                    <div className="mb-8">
                        <button 
                            onClick={generatePdf}
                            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/90 transition-colors shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5"
                        >
                            Download Report (PDF)
                        </button>
                        <p className="text-center text-xs text-text-light mt-2">Receive basic tailored results—no email required.</p>
                    </div>

                    <hr className="border-sage/50 my-6" />

                    <div>
                         <h3 className="font-medium text-lg text-text-dark mb-3 text-center">Join the Integrative Healing Mailing List</h3>
                         <p className="text-sm text-text-light mb-4">
                            Subscribe for exclusive insights, the latest evidence-based somatic practices, nervous system regulation tools, and behind-the-scenes wisdom from an experienced trauma integration coach—delivered weekly.
                         </p>
                         <ul className="space-y-2 text-sm text-text-light list-disc list-inside mb-5">
                            <li>Science-backed tips for calm and resilience</li>
                            <li>New mind-body research updates</li>
                            <li>Guided audio practices and breathwork</li>
                            <li>Special Q&A sessions and healing community invites</li>
                            <li>Early access to transformative integrative programs</li>
                         </ul>
                         <form action="https://formspree.io/f/mrbynzga" method="POST">
                            <input type="hidden" name="pattern" value={dominantPattern} />
                            <input type="hidden" name="score" value={totalScore} />
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter your email" 
                                    aria-label="Email for mailing list"
                                    className="flex-grow p-3 border border-sage rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                                    required
                                />
                                <button 
                                    type="submit" 
                                    className='py-3 px-6 rounded-lg font-medium transition-colors w-full sm:w-auto bg-accent text-white hover:bg-accent/90'
                                >
                                    Join
                                </button>
                            </div>
                         </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;