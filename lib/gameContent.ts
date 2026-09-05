export interface FaqItem {
  q: string;
  a: string;
}

export interface GameContent {
  tips: string[];
  features: string[];
  faq: FaqItem[];
}

const content: Record<string, GameContent> = {
  "emberwood-dash": {
    tips: [
      "Hold jump for a moment after leaving a ledge to trigger coyote time - the game lets you jump slightly after running off an edge, which turns near-misses into clean clears.",
      "The glowing golden leaf is your best friend. Chase it down and collect acorns aggressively while the magnet effect is active, because it saves you from risky detours later.",
      "Slide under the low-hanging vines instead of jumping over them - it is faster and keeps your rhythm, so the forest speed increase catches you off guard less often.",
      "Stick to one side of the path for short stretches. Streams and logs come in predictable patterns, and reading two moves ahead beats reacting to each obstacle.",
      "Short hops beat long jumps when the gap is small. A quick tap uses less air time and lets you land sooner, which matters as the run speeds up into dusk.",
    ],
    features: [
      "Endless woodland runner with progressively rising speed",
      "Golden leaf power-up turns you into an acorn magnet",
      "Jump, slide and double-jump controls tuned for keyboard and touch",
      "Coyote time and short hops reward precise platforming",
      "Best distance saved in your browser",
    ],
    faq: [
      {
        q: "Is Emberwood Dash really free to play?",
        a: "Yes. Emberwood Dash is completely free, runs directly in your browser and shows no ads inside the game. There is nothing to download, install or pay for - just press play and start running.",
      },
      {
        q: "How do I control Rusty the fox?",
        a: "Use the arrow keys or WASD on desktop to jump and slide, and tap the on-screen buttons on mobile. Hold to jump higher and release early for a short hop, which gives you fine control over tricky gaps.",
      },
      {
        q: "What does the golden leaf power-up do?",
        a: "The golden leaf turns you into an acorn magnet for a few seconds. Every acorn in the area pulls toward you automatically, so it is the perfect time to gather points without risking big jumps.",
      },
      {
        q: "Can I pause the game if I need a break?",
        a: "Yes, the pause button freezes the run so you can catch your breath. Your current distance is saved for that run, and you can resume exactly where you left off.",
      },
    ],
  },
  "veyras-legacy": {
    tips: [
      "Use Lena's small size to scout gaps and hidden ledges before committing Rafiq to a jump - a wrong step costs a life, but a quick look costs nothing.",
      "When a ledge is too high for Lena alone, position Rafiq underneath and switch so she climbs onto his shoulders. The pair of you can reach double the height.",
      "Golden keys always unlock something important, so never leave one behind. Backtracking is faster than reaching the gate without the key and having to turn around.",
      "Emeralds are usually tucked near puzzle solutions. Solving the lever-and-block puzzles while collecting them is more efficient than hunting for them afterwards.",
      "Play with a friend if you can - the co-op design lets one player control Lena and one control Rafiq, and two sets of eyes solve the temple's puzzles much faster.",
    ],
    features: [
      "Co-op puzzle-platforming with two interlocking heroes",
      "Lena climbs on Rafiq's shoulders to reach double the height",
      "Golden keys, hidden ledges and collectible emeralds to explore",
      "Two-player local co-op or single-player switching",
      "Automatic checkpoints that save your progress",
    ],
    faq: [
      {
        q: "Is Veyra's Legacy a two-player game?",
        a: "Veyra's Legacy was designed as a co-op puzzle-platformer, but you can play it solo by switching between Lena and Rafiq. With two players, one controls each hero and the puzzles feel truly cooperative.",
      },
      {
        q: "What is the goal of the game?",
        a: "Your goal is to explore the Temple of Veyra, collect golden keys to open the ancient gate and gather emeralds along the way. Reaching the gate with both heroes safe completes the level.",
      },
      {
        q: "Why can't Lena reach that high ledge?",
        a: "Lena is small, so she cannot reach high ledges alone. Switch to Rafiq and have Lena climb onto his shoulders - together they can reach elevated platforms and hidden areas.",
      },
      {
        q: "Does the game save my progress?",
        a: "Yes, checkpoints are scattered through the temple and your progress is saved automatically, so you can close the tab and continue from the last checkpoint next time.",
      },
    ],
  },
  "astro-sabotage": {
    tips: [
      "Watch the room tracker like a hawk. The crewmate who leaves the room right before a sabotage is the most likely suspect - note the timing before you vote.",
      "Read the event log carefully. Every action leaves a trace, and players who were in the wrong room at the wrong moment are the easiest to catch.",
      "Do not call a meeting the second you see anything odd. Gather two or three observations first so your accusation has weight instead of guesswork.",
      "Keep an eye on the oxygen timer. If you are sure who the impostor is, vote fast - but if you are not sure, your best move is to keep watching rather than accuse at random.",
      "Pay attention to players who always volunteer the alibi first. The real impostor usually rehearses their story, while crewmates simply describe what they saw.",
    ],
    features: [
      "Deduction game about finding the hidden impostor on a ship",
      "Room tracker and event log give you real evidence to weigh",
      "Meetings and voting let the whole crew decide together",
      "Oxygen timer keeps every match tense and fast",
    ],
    faq: [
      {
        q: "What is Astro Sabotage about?",
        a: "Astro Sabotage is a deduction game where an impostor hides among your crewmates and sabotages the ship. Watch the rooms, read the event log and call meetings to identify the impostor before the oxygen runs out.",
      },
      {
        q: "How do I win as a crewmate?",
        a: "As a crewmate, you win by finding the impostor and ejecting them. Gather evidence from the room tracker and event log, then use a meeting to convince the rest of the crew who the saboteur is.",
      },
      {
        q: "How does the meeting and voting work?",
        a: "When you call a meeting, every player gets a chance to share their observations. You then vote for the crewmate you believe is the impostor. The player with the most votes is removed from the ship.",
      },
      {
        q: "Is there a time limit?",
        a: "Yes, the oxygen supply is the constant pressure. If the impostor is not found before the oxygen runs out, the ship is lost. That timer is why quick, confident deductions matter.",
      },
    ],
  },
  "nano-serpent": {
    tips: [
      "Plan two moves ahead instead of reacting. A quick direction change near your own tail is the most common way to lose - always leave yourself an escape route.",
      "In the early game, collect food in a sweeping loop pattern. Moving in a wide S-shape keeps your head away from your tail and never paints yourself into a corner.",
      "Turn slightly before you absolutely have to. The instant corner-cut on the last frame feels fast, but it is the classic cause of a self-collision at speed.",
      "The walls are deadly, so aim to keep your snake away from the edges when you are long. Circle the centre and expand outward as you grow.",
      "Slow down your thinking, not your movement. Each food decision is cheap; each wall bump is fatal. Patience is the whole game at high lengths.",
    ],
    features: [
      "Classic Snake gameplay with a clean, modern presentation",
      "Zero ads and zero tracking inside the game",
      "Gradually rising pace keeps the tension building",
      "Instant restarts after every run",
    ],
    faq: [
      {
        q: "Is Nano Serpent a classic Snake game?",
        a: "Yes, Nano Serpent follows the classic Snake formula: eat food to grow longer and score more, avoid hitting the walls and avoid biting your own tail. It is a clean, modern take on a timeless game.",
      },
      {
        q: "Are there ads inside the game?",
        a: "No. Nano Serpent is completely ad-free and has no tracking. It is pure, uninterrupted gameplay from start to finish.",
      },
      {
        q: "What happens when the snake hits itself?",
        a: "Colliding with your own body ends the run. Your final score is recorded, and you can start a new round instantly to try and beat it.",
      },
      {
        q: "Does the game speed up as I grow?",
        a: "The pace increases gradually as your snake gets longer, keeping the difficulty rising while leaving you enough time to plan your turns.",
      },
    ],
  },
  "underground-sprint": {
    tips: [
      "Stay in the middle lane whenever you can. It gives you a full lane in both directions to react to barriers, instead of being trapped against a wall.",
      "Switch lanes in small, deliberate steps rather than one long sweep. Tapping once to dodge is safer than holding the key and drifting across three lanes.",
      "Sliding under signs is faster than jumping over them and keeps you lower to the ground, which helps when the next obstacle arrives quickly after.",
      "Grab coins in safe patterns. Coins usually sit in a lane with no obstacle, so following a coin line is a decent route - but always look ahead before committing.",
      "As the speed climbs, look further up the track. Your eyes lead your hands, so reading obstacles early gives you a full second more than reacting at the last moment.",
    ],
    features: [
      "Endless subway runner with rising speed and no limit",
      "Switch lanes, jump barriers and slide under signs",
      "Swipe controls tuned specifically for touch screens",
      "No ads or trackers inside the game",
      "Best distance saved to chase on every run",
    ],
    faq: [
      {
        q: "What is Underground Sprint?",
        a: "Underground Sprint is an endless subway runner built in-house. You switch lanes, jump over barriers, slide under signs and grab coins while the speed keeps rising without limit.",
      },
      {
        q: "How do I play on mobile?",
        a: "On mobile, swipe left or right to change lanes, swipe up to jump and swipe down to slide. The controls are tuned to feel responsive on touch screens.",
      },
      {
        q: "Is the game free and safe to play?",
        a: "Yes, Underground Sprint is free, runs in your browser and contains no ads or trackers inside the game itself. It is designed for quick, interrupted play sessions.",
      },
      {
        q: "When does the run end?",
        a: "The run ends when you hit a barrier or a train. Your best distance is saved, giving you a clear target to chase on your next attempt.",
      },
    ],
  },
  "aphelion-assault": {
    tips: [
      "Stay calm and fire in short, controlled bursts instead of holding the trigger. Accurate shots clear a lane faster than spraying, especially as the aliens descend.",
      "Take out the sides of each formation first. Weakening the wings stops the aliens from surrounding you and gives you an open escape corridor when the saucer appears.",
      "Never chase the mystery saucer recklessly. The bonus is tempting, but trading a life for points is a bad deal - only go for it when the formation is thin.",
      "Move in small, quick taps rather than holding left or right. The retro hitbox is forgiving, but tiny corrections let you thread gaps between incoming bullets.",
      "Use the shield deliberately. Park yourself under a shield while you plan your next lane shift, then move in a single decisive slide to the next cover.",
    ],
    features: [
      "Retro space-invaders style shooter with tight formations",
      "Shield cover and a mystery saucer bonus to contest",
      "Limited lives with escalating waves",
      "Tiny-correction controls that reward precision over spraying",
    ],
    faq: [
      {
        q: "What is Aphelion Assault?",
        a: "Aphelion Assault is a retro space-invaders style game. Alien squadrons descend in formation while you duck, weave and return fire from behind a shield, clearing wave after wave.",
      },
      {
        q: "How do I score the mystery saucer bonus?",
        a: "A mystery saucer crosses the top of the screen occasionally. Shoot it down for a large bonus - but only if you can do it without exposing yourself to the main formation.",
      },
      {
        q: "Do I have lives or a health bar?",
        a: "You have a limited set of lives. Losing a life resets the action but keeps the game going, and losing all your lives ends the run with your final score.",
      },
      {
        q: "Is there an ending?",
        a: "The waves keep escalating in speed and organisation, so the challenge is to survive as long as possible and stack the highest score you can.",
      },
    ],
  },
  "nova-corsair": {
    tips: [
      "Collect power-ups the moment they drop. Downed drones scatter them in arcs, so steer into the pattern instead of staying fixed in your lane.",
      "Save your charged cannon for the boss. The screen-clearing burst is hugely valuable against swarms, but the fifth-wave boss is where it changes the fight.",
      "Dodge asteroid fields in wide arcs. Trying to thread the smallest gap wastes time and usually costs a hit - go around, not through.",
      "Focus fire on drones that are about to shoot first. Taking out the closest threat immediately reduces the bullet count aimed at you.",
      "Keep your scoreboard mentality: chain kills without getting hit to build multipliers. A clean streak is worth far more than rushing for pickups.",
    ],
    features: [
      "Neon arcade shooter with asteroid fields and drone squads",
      "Charged cannon that clears the screen in one burst",
      "Boss fight every fifth wave",
      "Power-up drops from every downed drone",
      "Touch controls and a saved high score",
    ],
    faq: [
      {
        q: "What kind of game is Nova Corsair?",
        a: "Nova Corsair is a neon arcade shooter. You pilot the Corsair through asteroid fields and drone squadrons, with a boss appearing every fifth wave.",
      },
      {
        q: "How does the charged cannon work?",
        a: "Hold to charge your cannon into a powerful burst that clears the screen. Timing it well can wipe an entire drone wave or shred a boss's health bar.",
      },
      {
        q: "Can I play Nova Corsair on my phone?",
        a: "Yes. The game runs in any modern browser and includes touch controls, so you can fly and fire on mobile as well as desktop.",
      },
      {
        q: "Is there a high score system?",
        a: "Yes, your best score is saved locally so you can always chase a new personal best on every run.",
      },
    ],
  },
  "clash-of-orbs": {
    tips: [
      "Focus your early orbs on the centre of the grid. Central territory is easier to defend and radiates control into both flanks at once.",
      "Watch where the AI just flipped cells and counter there. The grid tips fastest at the border between the two colours, so fight for that line.",
      "Launch orbs in pairs on the same side. Two quick launches overwhelm the AI's ability to answer and flip bigger chunks of the grid.",
      "Do not obsess over the percentage during the early game. The control bar swings wildly until the board fills, so stay consistent and it will settle in your favour.",
      "When you reach the high 50s, switch from attacking to protecting. One or two defensive launches near your core stop the AI from flipping your advantage.",
    ],
    features: [
      "Territory-control puzzler where orbs roll and flip cells",
      "Adaptive AI opponent that grows with your skill",
      "First to 70% control of the grid wins",
      "One-tap controls identical on desktop and mobile",
    ],
    faq: [
      {
        q: "How do I win a clash?",
        a: "The first side to control 70% of the grid wins. Every orb you launch rolls across the board and flips each cell it touches to your colour.",
      },
      {
        q: "Is Clash of Orbs against a computer or another player?",
        a: "In the current version you play against an AI opponent that launches from the other side of the grid. The AI adapts, so the difficulty rises as you improve.",
      },
      {
        q: "How do I launch orbs on mobile?",
        a: "Tap anywhere on your half of the screen to launch an orb. On desktop you can also click your half - the controls are identical and one-tap simple.",
      },
      {
        q: "Why did my percentage drop so fast?",
        a: "An orb that rolls through a large area of your territory can flip many cells at once. That is why guarding the middle ground matters more than piling orbs into one corner.",
      },
    ],
  },
  "nebula-bastion": {
    tips: [
      "Build towers early rather than hoarding gold. One upgraded tower earns more gold per wave than three unupgraded ones sitting in the wrong spots.",
      "Place towers at the corners of the winding path. Corner positions give each tower two stretches of lane to cover, doubling its effective range.",
      "Invest in one tower type to start. Specialising early unlocks upgrades faster, then you can add variety once the horde begins mixing fast and tanky enemies.",
      "Watch which enemies leak past and adapt. If the fast runners are getting through, shift a tower closer to the path's start before the next wave begins.",
      "Keep at least one life in reserve for the first half of each wave. A single stray enemy can end the run, so prioritise the leak over chasing the last coin.",
    ],
    features: [
      "Tower-defense with three distinct tower types",
      "Adaptive upgrade economy driven by gold from kills",
      "Endless waves with mixing enemy types",
      "Corner positioning rewards strategic tower placement",
    ],
    faq: [
      {
        q: "What is Nebula Bastion?",
        a: "Nebula Bastion is a tower-defense game. Waves of invaders follow a winding path toward your bastion while you build and upgrade three tower types to stop them.",
      },
      {
        q: "How do I earn gold?",
        a: "Every downed enemy drops gold. The more efficiently your towers clear each wave, the more gold you have ready to spend on upgrades before the next one.",
      },
      {
        q: "What are the three tower types?",
        a: "The three tower types cover different roles: one deals fast single-target damage, one handles groups with splash damage and one slows enemies down. Balancing them is key.",
      },
      {
        q: "How many lives do I have?",
        a: "Your bastion has a limited number of lives. If too many invaders slip past your towers, you lose - so plugging leaks quickly is the core survival skill.",
      },
    ],
  },
  "pitch-battle": {
    tips: [
      "Hold to dribble, release to shoot, and always keep moving. A static ball carrier is the easiest target for a tackle.",
      "Watch the net before you shoot. Aiming for the corner the defender is not covering doubles your chances of finding the back of the net.",
      "Defenders should charge the carrier, not the ball. Cutting off the shooter's angle is more effective than lunging at the dribble and leaving the goal open.",
      "On touch, drag your half of the screen to move - small drags give you control, big drags send the ball flying, so match your input to the moment.",
      "The first goal changes the match. An early lead forces your opponent to open up and attack, which opens space for counter-attacks. Use it.",
    ],
    features: [
      "Same-screen local multiplayer soccer duel",
      "Player 1 on WASD, Player 2 on the arrow keys",
      "First to five goals wins the match",
      "Arcade rules with dribble, shoot and tackle",
      "Touch controls for two players on one device",
    ],
    faq: [
      {
        q: "Is Pitch Battle two players on one screen?",
        a: "Yes, Pitch Battle is a same-screen local multiplayer game. Player 1 uses WASD while Player 2 uses the arrow keys, or each player controls their half of the screen on touch devices.",
      },
      {
        q: "How many goals do I need to win?",
        a: "The first player to score five goals wins the match. With quick rematches, you can run a whole tournament in a few minutes.",
      },
      {
        q: "Can I play Pitch Battle alone?",
        a: "Yes, you can practise against the controls solo, though the game is designed for head-to-head battles. Grab a friend for the full experience.",
      },
      {
        q: "Is there a referee or rules?",
        a: "It is arcade rules: no offsides, no throw-ins, no red cards. Just dribble, shoot, tackle and score - the net settles every argument.",
      },
    ],
  },
  "2048-fusion": {
    tips: [
      "Never use all four directions equally. Sticking to up, left and down (or a two-move cycle) keeps your biggest tile in a corner, which is the foundation of every winning 2048 strategy.",
      "Lock your highest tile in a corner and never move it. Every swipe should either keep it planted or build a wall of descending values so it can merge naturally.",
      "Build a staircase, not a scatter. Arrange tiles in descending order along one edge so smaller tiles always feed into larger ones instead of clogging the board.",
      "Merging a small tile now is almost always better than waiting for a perfect combo later. A clean board gives you room to survive, and space is the real currency in 2048.",
      "When the board gets tight, undo your last swipe mentally - ask which swipe wastes the least space. If no move creates new room, you made a mistake three moves ago, not now.",
    ],
    features: [
      "Classic 2048 sliding puzzle with smooth controls",
      "Arrow keys, WASD or swipe to move the whole board",
      "Keep playing past 2048 to chase even higher tiles",
      "Subtle custom audio with a mute button",
      "Board state and score saved so you can keep going",
    ],
    faq: [
      {
        q: "How do I play 2048 Fusion?",
        a: "Every swipe shifts the whole board in that direction, and matching tiles fuse into the next tile up. Your goal is to merge your way to the 2048 tile - and keep going if you can.",
      },
      {
        q: "What controls does the game use?",
        a: "Use the arrow keys or WASD on desktop, and swipe anywhere on touch devices. There is no timer, so you can think about every move at your own pace.",
      },
      {
        q: "Is there a guaranteed way to win?",
        a: "There is no perfect algorithm, but the corner-and-staircase strategy dramatically raises your odds. Keep your largest tile in a corner, build descending rows into it and never swipe that corner loose.",
      },
      {
        q: "Why does the game have sound?",
        a: "2048 Fusion includes subtle sound effects for moves, merges, victory and game over, with a mute button in the corner. All audio is generated in your browser - no files are downloaded.",
      },
      {
        q: "What happens after I reach 2048?",
        a: "The game congratulates you but lets you keep playing. You can continue merging past 2048 to chase even higher tiles like 4096 and beyond.",
      },
    ],
  },
  "dustveil-speedway": {
    tips: [
      "Hug the racing line in the corners. Brake early and steer through the apex, then accelerate out - the sand punishes wide exits by bleeding your speed for a full second.",
      "Staying on the asphalt is everything. The moment your wheels kiss the sand your grip drops and your top speed is cut almost in half, so a clean line beats a desperate overtake every time.",
      "Brake before the corner, not inside it. Scrubbing speed mid-corner costs you the exit, and a fast exit is worth more than a fast entry on every straight that follows.",
      "Give the AI cars a little room when they are right beside you. A side nudge can spin you both into the dust, while backing off one car length keeps you in the race.",
      "Slipstream the car ahead on the straights. Matching their line at close distance keeps you right behind their bumper, ready to dive inside at the next braking zone.",
    ],
    features: [
      "Arcade racing on a punishing desert circuit",
      "Race three AI rivals over three laps",
      "Realistic grip model: sand bleeds your speed",
      "Best lap time and ghost racing saved in your browser",
      "Simple keys or on-screen touch pedals and steering",
    ],
    faq: [
      {
        q: "What is Dustveil Speedway?",
        a: "Dustveil Speedway is an original arcade racing game on a dust-choked desert circuit. You race three AI rivals over three laps, and the fastest driver across the line takes the win.",
      },
      {
        q: "How do I control my car?",
        a: "Use the arrow keys or WASD on desktop: up or W to accelerate, down or S to brake, and left or right to steer. On touch devices, on-screen pedals and steering buttons appear automatically.",
      },
      {
        q: "Why is my car so slow on the sand?",
        a: "The desert off-track is deliberately punishing: grip drops and your top speed is cut roughly in half. Brake into corners, stay on the asphalt and you will keep most of your pace.",
      },
      {
        q: "How are lap times and best times saved?",
        a: "Your best lap time is saved in your browser, so you can always race against your own ghost. The race ends after three laps and shows your race time, best lap and final position.",
      },
    ],
  },
  "nexlume": {
    tips: [
      "One quiet spin beats three busy ones. Because a single rotation moves a whole row or column at once, scan the grid for a colour sitting two cells away from its pair - that one spin links all three and leaves the rest of the board untouched for your next move.",
      "Let the cascade think for you. When shards bloom, fresh ones drift down from above, so a small rotation near the top of the grid can turn into a long chain that clears far more than a dramatic twist in the middle.",
      "Work the bottom rows first. Orbs only fall, never rise, so the lower half of the grid is where space runs out first. Keep a breathing gap near the floor and the whole board stays alive longer.",
      "Diagonals are the quiet setup. Three matching shards that sit diagonally are one row or column spin away from blooming - keep an eye on those slanted pairs when the grid feels too tangled to read.",
      "There is no clock, so trust the slow read. When the board looks locked, pick the colour you can count the most of, then spend one rotation finding them instead of spinning rows at random - order slips back in faster than you expect.",
    ],
    features: [
      "Relaxing rotation puzzle with glowing shard constellations",
      "No timer, no pressure - play entirely at your own pace",
      "Cascade blooms that chain across the whole grid",
      "Best score saved automatically",
      "Colour count grows as you level up for deeper challenges",
    ],
    faq: [
      {
        q: "Is Nexlume really free to play?",
        a: "Yes. Nexlume is completely free, runs entirely in your browser and shows no ads inside the game. There is nothing to download or install - just drift in and start linking shards.",
      },
      {
        q: "How do I control the game?",
        a: "Click or tap a cell to select it, then use the arrow keys on desktop or the on-screen pad on mobile to rotate that row or column. Rotate until three or more matching shards line up and they bloom.",
      },
      {
        q: "What makes the orbs bloom?",
        a: "Align three or more shards of the same colour in a row or column and they bloom, pop and release light. New shards then drift down from above, which can set off chain cascades of extra blooms.",
      },
      {
        q: "Is there a time limit?",
        a: "No. Nexlume is deliberately unhurried - there is no clock and no countdown, only the grid and your own pace. The game ends when the board is full and no three shards can be linked.",
      },
      {
        q: "Does the game remember my best score?",
        a: "Yes, your best score is saved in your browser automatically, so you always have a quiet target to drift toward on your next session.",
      },
      {
        q: "Why did the grid grow more colours?",
        a: "Early levels use four colours to ease you in. As you level up, a fifth and then a sixth colour join the grid, crowding the board and asking for longer, gentler planning.",
      },
    ],
  },
  "kvaxor": {
    tips: [      "A four-in-a-row needs four marks, so a quiet three feels invisible - until it isn't. Build three in a line with one open end and your rival is forced to respond, which buys you the freedom to start a second line somewhere else.",
      "Bait the block. When your opponent keeps answering your threats, lay a three that is not your real plan; the moment they rush to cover it, the board opens up on the other side and your actual line takes shape.",
      "Savage mode never misses an open four. Before you plant a mark, check every row, column and diagonal passing through that cell for a rival run of three - a single greedy move can hand the CPU a crown and all three points.",
      "The centre is the quiet king. The middle cell sits inside more possible winning lines than any corner, so on a fresh board it is worth grabbing early - and on a crowded board it is worth defending.",
      "A full five is triple the points, but never chase it with your eyes closed. Forcing the fifth mark lets your opponent see the line a mile away; usually the faster four is the smarter win.",
    ],
    features: [
      "5x5 twist on tic-tac-toe with four-in-a-row to win",
      "Full five crowns the round with triple points",
      "Three CPU difficulties from Casual to Savage",
      "Two Players pass-and-play mode on one screen",
      "Mouse, touch and keyboard controls",
    ],
    faq: [
      {
        q: "Is Kvaxor really free to play?",
        a: "Yes. Kvaxor is completely free, runs entirely in your browser and shows no ads inside the game. There is nothing to download or install - just open the grid and start dropping marks.",
      },
      {
        q: "How do I win in Kvaxor?",
        a: "Line up four of your marks in any straight line - horizontal, vertical or diagonal - and you win the round for one point. Complete a full five in a row and the crown is yours for three points. First to five points claims the set.",
      },
      {
        q: "Why four in a row instead of three?",
        a: "That is the whole point of Kvaxor. A 3x3 tic-tac-toe board ends in a draw when both players know the game, but a 5x5 grid with four-to-win is wide enough for real traps, feints and comebacks.",
      },
      {
        q: "What difficulty should I choose?",
        a: "Casual plays loose and forgiving, Balanced blocks your obvious threats, and Savage hunts every open line and fork. Two Players turns the board into a pass-and-play duel against a friend on the same device.",
      },
      {
        q: "Can I play Kvaxor against a friend?",
        a: "Yes. Pick Two Players from the menu and X and O take turns on the same screen. On desktop use the mouse, touch or arrow keys plus Enter to place your mark.",
      },
      {
        q: "Why is the name Kvaxor?",
        a: "Because there was no game called Kvaxor until this one. It is an invented word for an invented twist - the X that crosses four lines of thinking. You will not find it anywhere else on the web.",
      },
    ],
  },
  "mazewhisper": {
    tips: [
      "Aim down the lantern beam: the light does not freeze it, but a hit does. One round staggers it for a moment — use the stagger to back away and turn a corner before it starts hunting again.",
      "Hoard your ammo for the second half of the run. Embers sit deep in the maze, so save your rounds for the corridors the stalkers patrol — you start with thirty rounds and ammo boxes are scarce, so make every shot count. First-aid kits restore five HP, so save them until a stalker has clawed you below half.",
      "The two glowing red eyes in the darkness show exactly where it is. When they vanish, it is closing on your flank — and it is faster than you in a straight line, so shoot, turn a corner, then shoot again.",
      "The exit is sealed until you carry all three embers. Once it opens, stay near the ring but keep a round in the chamber — it will not stop hunting just because you are close to freedom.",
      "When the ammo count drops to three or less, stop shooting at anything you cannot see clearly. A dry click is a death sentence here, so treat three rounds as your real emergency line and walk — do not run — toward the nearest ammo box.",
    ],
    features: [
      "First-person survival horror through a procedural maze",
      "Synthesized audio: whispers, drips, chimes and more",
      "Three difficulties that change maze size and stalker count",
      "Minimap tracks your path, the embers and the hunters",
      "Ammo and medkit economy that demands careful planning",
      "Keyboard, mouse and touch controls",
    ],
    faq: [
      {
        q: "Is Mazewhisper really free to play?",
        a: "Yes. Mazewhisper is completely free, runs entirely in your browser and shows no ads inside the game. There is nothing to download, install or pay for - just descend into the maze and try to shoot your way back out.",
      },
      {
        q: "How do I play on desktop and on mobile?",
        a: "On desktop use WASD or the arrow keys to walk, move the mouse to look around and click (or press Space) to shoot - click the screen once to capture the pointer. On touch screens, your left thumb steers, your right thumb looks, and a quick tap fires. A minimap in the corner shows where you have been, where the embers and medkits are, and the red dots that are hunting you.",
      },
      {
        q: "What is the goal of the game?",
        a: "Find the three glowing embers hidden throughout the maze, then reach the exit ring once it awakens. Pale stalkers hunt you through the dark: your lantern only lights the way, but each bullet staggers them and enough hits silence one for good.",
      },
      {
        q: "Why is my ammo so low?",
        a: "You start with thirty rounds and ammo boxes are scarce (each restores eight). Sometimes a fallen stalker drops a little extra. The deeper you descend, the more of them hunt you through the dark, so pick your fights carefully.",
      },
      {
        q: "What do the three difficulties change?",
        a: "Hollow is a shallow maze with three slow stalkers that fall to three rounds. Deep sends six faster stalkers through a bigger maze. Abyss drops nine relentless stalkers through the largest maze - every stalker falls to three rounds, so the bullets never seem to be enough. You survive sixteen hits on every difficulty, so hoard your first-aid kits.",
      },
      {
        q: "Is the sound really scary?",
        a: "That is the point. The audio is synthesized live in your browser - dripping water, breathing tunnels, whispers that close in as it nears, gunshots that echo off the stone, a heartbeat that quickens, and one very final scream. Use the mute button (M) if the pit gets too loud.",
      },
    ],
  },
  "bishopspire": {
    tips: [
      "Control the four central squares and the bishop pair will write you letters of recommendation. A pawn in the centre is worth more than a bishop on the rim, so build your structure before you go hunting.",
      "Before every capture, ask who is watching. The engine will happily hang its queen as bait if your recapture lets it skewer your king along the open file - count the defenders and keep your pieces protected.",
      "Savage thinks three moves deep and punishes every loose pawn. Push only when you mean it: a passed pawn is a promotion waiting to happen, but a pushed pawn is a hole your rival will live in.",
      "Castle early, but never through fire. Kingside castling tucks your king away in three moves - if the squares you need are attacked, keep the king home until the danger passes.",
      "Endgames are won by the active king. With few pieces left, walk your king forward and let it support the pawns - the extra king move is worth more than any subtlety the middlegame offered.",
    ],
    features: [
      "Full classical chess with castling, en passant and promotion",
      "Three CPU difficulties from Casual to Savage",
      "Two Players pass-and-play on the same board",
      "Play as White, Black or Random",
      "Undo, board flip and mute shortcuts",
      "Scoreboard tracks your match results",
    ],
    faq: [
      {
        q: "Is Bishopspire really free to play?",
        a: "Yes. Bishopspire is completely free, runs entirely in your browser and shows no ads inside the game. There is nothing to download, install or pay for - just open the board and make your first move.",
      },
      {
        q: "What does the name Bishopspire mean?",
        a: "It is an invented word for an invented game - a spire built of bishops and strategy that you will not find anywhere else on the web. Every move you make climbs it a little higher.",
      },
      {
        q: "How do I move the pieces?",
        a: "Click or tap a piece to see its legal destinations glow, then choose one to move. A pawn reaching the far side opens a promotion picker where you can choose queen, rook, bishop or knight. Press U to undo, F to flip the board and M to mute.",
      },
      {
        q: "Which difficulty should I choose?",
        a: "Casual plays loose and forgiving, Balanced thinks a few moves ahead, and Savage hunts you through your own plans with the deepest search. Two Players turns the same screen into a pass-and-play duel with a friend.",
      },
      {
        q: "Does it handle all the rules?",
        a: "Every classical rule is enforced: castling (including castling through check), en passant, promotion, check, checkmate, stalemate, the fifty-move rule, threefold repetition and insufficient material are all called exactly when they should be.",
      },
      {
        q: "Can I play as Black or against a friend?",
        a: "Yes. Choose White, Black or Random before climbing - if you pick Black the CPU opens the game. Two Players mode lets two humans duel on the same board, and your match results are tracked on the scoreboard.",
      },
    ],
  },
  "klondrake": {
    tips: [
      "Build the towers first. The four foundations from Ace to King are your victory - move any Ace you see the moment it appears, and keep the cards above it in the waste or on the tableaux flowing toward it.",
      "Reveal the buried. Every card you pull off a tableau pile flips a new one face up and scores you five points, so dig through piles with more hidden cards first and leave the shallow ones for later.",
      "Think red on black. Tableau piles build downward in alternating colours - a red six sits on a black seven. Empty columns accept only Kings, so save a King for the moment a column opens and drop it there fast.",
      "Savage draws three, so watch the order. The top card of the waste is your only free choice in Draw 3 - plan the next two draws ahead and avoid trapping a card you need under the one on top.",
      "Do not hoard the hint. If the table looks dead, press H - the drake will point out a real move. When nothing moves, draw again: a fresh card always reshuffles your options.",
    ],
    features: [
      "Full classical Klondike solitaire in a dragon-hoard theme",
      "Casual draws one card, Savage draws three with a penalty",
      "Four towers to build from Ace to King",
      "Hint, auto-place, undo and mute shortcuts",
      "Scoring system saves your best to the leaderboard",
    ],
    faq: [
      {
        q: "Is Klondrake really free to play?",
        a: "Yes. Klondrake is completely free, runs entirely in your browser and shows no ads inside the game. There is nothing to download, install or pay for - just deal the hoard and start stacking.",
      },
      {
        q: "What does the name Klondrake mean?",
        a: "It is an invented word for an invented game - a golden hoard guarded by a drake, dealt like a classical Klondike solitaire. It is a name you will not find anywhere else on the web.",
      },
      {
        q: "How do I play?",
        a: "Click or tap a card to pick it up, then click a glowing spot to drop it. Double-click a card to auto-play it to the towers, press Space to draw, H for a hint, A to auto-place, U to undo and M to mute.",
      },
      {
        q: "What is the difference between Casual and Savage?",
        a: "Casual draws one card at a time for a calm, winnable climb. Savage draws three cards and applies a redeal penalty, making every turn of the lair's stockpile a risk worth weighing.",
      },
      {
        q: "Does the game track my score?",
        a: "Yes. Every card placed on a tower scores ten, revealed cards score five, waste-to-tableau plays score five, and pulling a card off a tower costs fifteen. Your best score is saved on your device.",
      },
      {
        q: "What happens when I run out of draws?",
        a: "When the stockpile is empty, click it to move the waste back and deal again. In Savage mode each redeal costs you a hundred points, so use every waste card before recycling the deck.",
      },
    ],
  },
  "nebula-grinder": {
    tips: [
      "The golden asteroid is the real treasure. It drifts in for a moment and fades just as fast — one catch is worth more than a full minute of tapping, so drop whatever you are doing and grab it.",
      "Buy your auto-grinders before you stack damage. A steady stream of dust while you are away beats a slightly bigger tap you have to click yourself, and the idle income is what funds the expensive upgrades.",
      "Plasma picks double every tap, but they multiply your autos too. The moment your grinders are chewing, every pick you own doubles both sides of the machine, so the upgrade ladder climbs faster than it looks.",
      "Do not skip the forges and warp collectors. Forges stack the per-second flow and warp collectors multiply the whole hoard — together they turn a nice grind into a hoard that snowballs on its own.",
      "When the shop feels slow, that is the milestone whisper. Each milestone chime marks a real jump in the pace, so save toward the next tier instead of dribbling dust into small buys — the shop catches up faster than you think.",
    ],
    features: [
      "Incremental clicker with satisfying tap feedback and evolving visuals",
      "Idle progress: auto-grinders, drone swarms and forges earn while you rest",
      "Golden asteroid bonus events with big one-time dust payouts",
      "Progress saved automatically in your browser",
      "Completely free, ad-free and runs instantly in your browser",
    ],
    faq: [
      {
        q: "Is Nebula Grinder really free to play?",
        a: "Yes. Nebula Grinder is completely free, runs straight in your browser and shows no ads inside the game. There is nothing to download, install or pay for — just press play and start grinding the rock.",
      },
      {
        q: "How does the golden asteroid work?",
        a: "A golden asteroid wanders across the field every so often and lingers only a moment. Tap it before it fades and it pays a huge one-time dust bonus — far more than your grinders could make in the same time.",
      },
      {
        q: "Do I have to keep clicking forever?",
        a: "No. Auto-grinders, drone swarms and forges keep dust flowing while you rest. The game is built to reward both active tapping and idle progress, so a short break never means the machine stops.",
      },
      {
        q: "What does each shop upgrade do?",
        a: "Plasma picks double your tap power, auto-grinders chew rock on their own, drone swarms stack more income every second, forges boost the per-second flow, and warp collectors multiply the entire hoard. Buying them in balance is what makes the dust snowball.",
      },
      {
        q: "Is my progress saved?",
        a: "Yes, your best hoard is saved in your browser automatically, so you can close the tab and come back to a personal best to chase on your next session.",
      },
    ],
  },
  "shardlume": {
    tips: [
      "Chase the cascade, not the single match. Every linked chain doubles the points, so a small swap near the top that knocks two or three matches loose is worth far more than a clean three-in-a-row tucked in a corner.",
      "Read the whole board before you tap. With sixty seconds on the clock, one planned cascade beats three rushed swaps — always scan for a shard sitting two cells away from a pair of its own kind first.",
      "When the board reshuffles, that is your reset, not your loss. It happens the moment no move is left and means a fresh grid, so take a breath and hunt the new patterns instead of panic-swapping into a dead end.",
      "Keep your eyes on the score, not the timer. The clock is the pressure, but the score is the prize — a steady rhythm of real matches outruns a frantic spray of failed swaps every single time.",
      "On desktop, let the keyboard do the talking. Arrows move the cursor and Enter picks and swaps, which is faster and far more precise than chasing shards with the mouse while a cascade is building.",
    ],
    features: [
      "Match-3 puzzle with chain cascades that double your points",
      "Six colours and shapes keep every board a fresh read",
      "Auto-reshuffle the moment no move is left, so you never stall",
      "Sixty-second rounds with a saved personal best",
      "Keyboard and touch controls for desktop and mobile",
    ],
    faq: [
      {
        q: "Is Shardlume really free to play?",
        a: "Yes. Shardlume is completely free, runs straight in your browser and shows no ads inside the game. There is nothing to download, install or pay for — just line up the shards and watch the light bloom.",
      },
      {
        q: "How do I play?",
        a: "Tap one shard, then tap an adjacent one to swap them. Line up three or more of the same colour and they shatter; every linked cascade doubles the points. On desktop, arrow keys move the cursor and Enter picks and swaps.",
      },
      {
        q: "Why does the board use different shapes?",
        a: "Each shape only matches with itself — diamonds with diamonds, stars with stars. The six colours and shapes mix it up so you are really reading the board, not just skimming the palette.",
      },
      {
        q: "What happens when no moves are left?",
        a: "The board reshuffles itself automatically, so you are never stuck staring at a dead grid. The flow keeps going and the clock keeps ticking — reshuffles are free, wasted swaps are not.",
      },
      {
        q: "How long does a run last?",
        a: "Sixty seconds, then the lumens run dry and your score is locked in. Your best score is saved in your browser automatically, so every run hands you a target to beat next time.",
      },
    ],
  },
  "style-salon": {
    tips: [
      "Match the colour palette before chasing rare pieces. Two items that share the same shade family always score higher than two flashy pieces that clash, so scan the colour wheel first and build from there.",
      "Rotate the mannequin after every swap. Some accessories sit at angles that look great from the front and terrible from the side — a quick spin catches mismatches before you lock the outfit in.",
      "Stack multipliers by chaining complementary items. A top and bottom from the same set, paired with a matching accessory, triggers the combo bonus that pushes your score into the next tier.",
      "Unlock new pieces by playing, not by paying. Every round you complete adds fresh items to the wardrobe, so the fastest way to a bigger wardrobe is one more round, not one more purchase.",
      "Watch the score preview before confirming. The game shows you a rough point estimate as you build — if the number feels low, swap one piece and the whole outfit can shift from mediocre to stunning.",
    ],
    features: [
      "Rotating mannequin with a full wardrobe of items",
      "Unlock new hairstyles and clothing by playing rounds",
      "Colour-matching and combo multipliers reward good taste",
      "Wardrobe and best score saved in your browser",
    ],
    faq: [
      {
        q: "Is Style Salon free to play?",
        a: "Yes. Style Salon is completely free, runs in your browser and shows no ads inside the game. There is nothing to download, install or pay for — just open the wardrobe and start styling.",
      },
      {
        q: "How do I play on mobile?",
        a: "Tap a category tab to browse items, tap a piece to equip it on the mannequin, and tap confirm when you are happy with the look. Swipe or drag to rotate the mannequin and check the outfit from every angle.",
      },
      {
        q: "What do style points unlock?",
        a: "Style points raise your level, and each new level adds fresh hairstyles, tops, bottoms and accessories to the wardrobe. The higher your score per round, the faster new pieces appear.",
      },
      {
        q: "Does the game save my wardrobe?",
        a: "Yes, your unlocked items and best score are saved in your browser automatically, so you can close the tab and come back to a wardrobe that remembers everything.",
      },
    ],
  },
  "mech-mayhem": {
    tips: [
      "Pick up power-ups the moment they drop. Every scrap robot scatters one, and the spread-shot or shield boost can turn a losing wave into a clean clear — do not let them sit on the field while you are busy dodging.",
      "Focus fire on the closest threats first. A drone that is already firing at you is more dangerous than three sitting at the back of the arena, so prioritise the shots that are about to hit.",
      "Save the shield power-up for the boss. Regular waves are survivable without it, but a boss that fills the screen with projectiles is where the extra hit point makes the difference between a clear and a crash.",
      "Strafe in short bursts, not long sweeps. Moving one direction for too long puts you on a predictable line that the AI learns to target — short, sharp direction changes keep you alive longer.",
      "Watch the wave counter, not just the score. Every fifth wave is a boss, and knowing it is coming means you can save your charged power-up and position yourself in the centre before the arena fills.",
    ],
    features: [
      "Cockpit-style arcade shooter with a big cannon",
      "Four power-ups: spread shot, rapid fire, shield and repair",
      "Endless waves with a boss every fifth wave",
      "WASD, arrows and touch controls",
      "High score saved in your browser",
    ],
    faq: [
      {
        q: "Is Mech Mayhem free to play?",
        a: "Yes. Mech Mayhem is completely free, runs in your browser and shows no ads inside the game. There is nothing to download, install or pay for — just press play and start shooting.",
      },
      {
        q: "How do I move and shoot on mobile?",
        a: "Touch the left side of the screen to move left, the right side to move right, and tap the centre to fire. The controls are tuned to feel responsive on touch screens.",
      },
      {
        q: "What do the power-ups do?",
        a: "Power-ups drop from every destroyed enemy and include spread-shot (fires multiple projectiles at once), rapid fire (increases your fire rate), shield (absorbs one extra hit), and repair (restores a portion of health).",
      },
      {
        q: "How many waves are there?",
        a: "The waves loop indefinitely, each one spawning more and tougher enemies. Every fifth wave is a boss fight, and the challenge escalates with each cycle until your reflexes give out.",
      },
      {
        q: "Does the game save my best score?",
        a: "Yes, your high score is saved in your browser automatically, so you can always chase a new personal best on every run.",
      },
    ],
  },
  "kitchen-rush": {
    tips: [
      "Read the recipe before you tap. One quick glance at the ingredient order saves you a wrong tap, and a wrong tap kills the combo — accuracy always beats speed in the early rounds.",
      "Chain perfect orders for the multiplier. Three consecutive correct dishes without a mistake triggers the combo bonus, and the multiplier applies to every dish that follows until you slip.",
      "Prioritise the fastest recipes when the queue is long. Simple dishes like salad and sushi finish quicker than complex ones, so clearing them first keeps the timer from catching up.",
      "Watch the timer colour, not just the number. The bar shifts from green to yellow to red as time runs out — a quick colour glance tells you how much pressure you are under without reading the digits.",
      "Do not rush the ingredient order to save a tenth of a second. A correct dish at the last moment still earns full points, but a wrong dish earns nothing and resets the streak.",
    ],
    features: [
      "Fast recipe-matching with a race against the timer",
      "Combo multiplier for consecutive perfect orders",
      "Priority system rewards smart order selection",
      "Touch-friendly ingredient buttons",
      "Best score and level saved automatically",
    ],
    faq: [
      {
        q: "Is Kitchen Rush free to play?",
        a: "Yes. Kitchen Rush is completely free, runs in your browser and shows no ads inside the game. There is nothing to download, install or pay for — just tap the ingredients and start cooking.",
      },
      {
        q: "How do I play on mobile?",
        a: "On mobile the ingredient buttons are arranged in a row at the bottom of the screen. Tap them in the order shown at the top to build the dish, and serve before the timer runs out.",
      },
      {
        q: "What happens when the timer runs out?",
        a: "The round ends and your score is locked in. Your best score is saved, so you can always jump back in and chase a higher combo on your next session.",
      },
      {
        q: "What do combo multipliers do?",
        a: "Every consecutive correct dish without a mistake adds to your combo multiplier. The higher the multiplier, the more points each dish is worth — so a clean streak is worth far more than a messy batch.",
      },
      {
        q: "Does the game save my progress?",
        a: "Yes, your best score and current level are saved in your browser, so you can close the tab and come back to a new target to chase.",
      },
    ],
  },
  "stick-dash": {
    tips: [
      "Double-jump is your lifeline. A second tap at the peak of the first jump lifts you over obstacles that a single jump cannot clear — learn the height difference and use it for the tall barriers.",
      "Slide under anything that looks low. The slide keeps your hitbox small and fast, and it recovers quicker than a failed jump, so when in doubt, go low.",
      "Coins usually line up with the safe path. Following the coin trail is a decent shortcut to the easiest route through the next cluster, but always glance ahead before committing.",
      "The retry button is one tap away. Use it. Every death teaches you the rhythm of the next obstacle cluster, and the fastest way to learn is to start again immediately.",
      "Watch the ground colour. The track shifts from dark to bright as the speed climbs, which tells you how fast the next obstacle is approaching without needing to read a speed indicator.",
    ],
    features: [
      "Neon endless runner with a fearless stickman",
      "Double-jump and slide mechanics for varied obstacles",
      "Coin trails that mark the safe path",
      "Progressive speed that keeps each run fresh",
      "Best run and coin totals saved on your device",
    ],
    faq: [
      {
        q: "Is Stick Dash free to play?",
        a: "Yes. Stick Dash is completely free, runs in your browser and shows no ads inside the game. There is nothing to download, install or pay for — just press play and start running.",
      },
      {
        q: "How do I jump and slide on mobile?",
        a: "Tap anywhere on the screen to jump, and swipe down to slide. You can double-tap for a second jump at the peak of the first one.",
      },
      {
        q: "What happens when I hit an obstacle?",
        a: "The run ends immediately and your distance and coin count are locked in. Your best run is saved, so you always have a target to chase on your next attempt.",
      },
      {
        q: "Does the game get faster?",
        a: "Yes, the track speed increases gradually as your distance grows, so obstacles arrive faster and the gaps between them tighten the longer you survive.",
      },
      {
        q: "Is my progress saved?",
        a: "Yes, your best distance and total coins are saved in your browser automatically, so you can close the tab and come back to a new personal best to beat.",
      },
    ],
  },
  "blorb-bonanza": {
    tips: [
      "Auto-tappers are the foundation. Buy them early and let the idle income build while you figure out the rest of the shop — a steady stream of Blorb Bits is worth more than a bigger single click.",
      "Click power multiplies the auto income too. Every click upgrade you buy doubles both your manual taps and the passive flow, so it is never wasted even if you stop clicking.",
      "Watch for the milestone toasts. They mark real jumps in the Blorb's evolution — new colours, bigger animations and higher income tiers — so save toward the next milestone instead of buying small upgrades randomly.",
      "Confetti and colour shifts are not just cosmetic. Each visual change signals a new tier of income, so if the Blorb looks the same, you are not growing fast enough.",
      "The shop handle pulls up with one tap. Do not let the shop sit closed when you have enough Bits to buy — every second the shop is closed is a second of missed upgrades.",
    ],
    features: [
      "Tap-based idle clicker with a wobbling hero",
      "Shop upgrades: click power, auto-tappers and multipliers",
      "Milestones that evolve the Blorb's look and income",
      "Idle income keeps growing while you are away",
      "Progress saved automatically in your browser",
    ],
    faq: [
      {
        q: "Is Blorb Bonanza free to play?",
        a: "Yes. Blorb Bonanza is completely free, runs in your browser and shows no ads inside the game. There is nothing to download, install or pay for — just tap the blob and start earning.",
      },
      {
        q: "How do I open the shop?",
        a: "Tap the pull-up handle at the bottom of the screen to slide the shop panel open. Browse the upgrades, tap the one you want to buy, and pull the handle down to close it.",
      },
      {
        q: "What do the upgrades do?",
        a: "Upgrades include click power (increases bits per tap), auto-tappers (earn bits passively each second), income multipliers (boost the auto-tapper output), and visual evolutions (change the Blorb's appearance).",
      },
      {
        q: "Does the game save my progress?",
        a: "Yes, your Blorb Bits, upgrades and best haul are saved in your browser automatically, so you can close the tab and come back to a bigger Blorb waiting for you.",
      },
      {
        q: "What are milestones?",
        a: "Milestones are big targets that trigger a toast notification and unlock new Blorb tiers. Each tier changes the Blorb's colour and shape and adds a new layer of income potential.",
      },
    ],
  },
  "voxel-voyage": {
    tips: [
      "Steer in small, deliberate taps. Holding a direction too long drifts you into the wall — short corrections keep you centred and leave room to dodge the next obstacle.",
      "Energy orbs sit in the safe gaps. Following the orb trail is a good default path, but always glance ahead before committing — an orb near a barrier is a trap.",
      "Speed is the real danger, not distance. The corridor tightens and the walls rush past faster every second, so a clean dodge at high speed is worth ten cautious metres at low speed.",
      "The speed bar at the bottom is your early warning. When it fills toward red, the next obstacle is closer than it looks — start your correction early.",
      "Your best distance sits at the top of the screen. Use it as a pacing target — if you are ahead of it, play safe; if you are behind, push a little harder but not recklessly.",
    ],
    features: [
      "Endless voxel corridor with rising speed",
      "Energy orbs guide you through the safe gaps",
      "A/D on desktop or swipe on mobile",
      "Speed bar gives early warning of danger",
      "Best distance saved to beat on every flight",
    ],
    faq: [
      {
        q: "Is Voxel Voyage free to play?",
        a: "Yes. Voxel Voyage is completely free, runs in your browser and shows no ads inside the game. There is nothing to download, install or pay for — just press play and start flying.",
      },
      {
        q: "How do I control the ship on mobile?",
        a: "Swipe left or right to steer the ship. The controls are tuned to feel responsive on touch screens, and small swipes give you finer control than big ones.",
      },
      {
        q: "What do the energy orbs do?",
        a: "Energy orbs add to your score and help guide you toward the safe gaps between obstacles. They are not required to survive, but collecting them raises your final tally.",
      },
      {
        q: "Does the game get harder?",
        a: "Yes, the speed increases steadily and the obstacles spawn closer together the longer you fly. The corridor itself does not narrow, but the pace makes every gap feel tighter.",
      },
      {
        q: "Is my best distance saved?",
        a: "Yes, your best distance is saved in your browser automatically, so you can always come back and try to fly further than before.",
      },
    ],
  },
  "gemfall-depths": {
    tips: [
      "Clear every room on a floor before heading for the stairs. Skipping rooms means missing gems, gold and health potions that you will need two floors down, and there is no going back.",
      "Attack the moment an enemy enters your range. Waiting for them to get closer only gives them a free hit — the sword's reach is longer than most enemy attacks, so swing early.",
      "Spend gold at the shop between floors. Hoarding gold is tempting, but an upgraded sword or extra health potion is worth more than a pile of coins you never use.",
      "Watch the floor counter, not just your health. Knowing you are on floor fifteen of twenty tells you how much danger to expect — the deeper you go, the tougher every room becomes.",
      "Health potions stack. Do not use a potion at full health hoping it will heal you later — pick them up and use them when you actually need the heal, not before.",
    ],
    features: [
      "Twenty procedurally generated dungeon floors",
      "Slimes, skeletons, bats and tougher enemies each level",
      "Shop between floors to upgrade sword and health",
      "Health potions you can stock and use when needed",
      "WASD or arrow keys to move, Space or click to attack",
    ],
    faq: [
      {
        q: "Is Gemfall Depths free to play?",
        a: "Yes. Gemfall Depths is completely free, runs in your browser and shows no ads inside the game. There is nothing to download, install or pay for — just enter the dungeon and start crawling.",
      },
      {
        q: "How do I play on mobile?",
        a: "On mobile, drag anywhere on the screen to move your character and tap anywhere to attack. The controls are tuned for touch and respond to small, deliberate inputs.",
      },
      {
        q: "What is the goal?",
        a: "Descend through twenty procedurally generated floors, defeat the enemies on each one, collect gems and gold, and reach the bottom alive. Every floor is a fresh layout, so memorisation is not an option.",
      },
      {
        q: "How do I upgrade my character?",
        a: "Gold earned from defeating enemies can be spent at shops that appear between floors. Buy sword upgrades to deal more damage, health potions to survive longer, or both.",
      },
      {
        q: "Is the dungeon the same every run?",
        a: "No. The dungeon is procedurally generated, so every run produces different room layouts, enemy placements and item locations. The only constant is the challenge.",
      },
    ],
  },
  "racket-rumble": {
    tips: [
      "Move the racket early, not at the last moment. Anticipating where the ball will land and positioning the racket there before it arrives beats chasing it with a desperate lunge every time.",
      "Use the power smash sparingly. The double-tap smash is faster and heavier than a normal return, but it leaves your court open if the AI gets a racket on it — save it for a ball the AI is slow to reach.",
      "Aim for the corners, not the centre. A return that lands near the baseline or the sideline forces the AI to move further and gives you more time to reposition for the next shot.",
      "Watch the AI's position, not just the ball. If the AI is deep in its court, a short lob over its head can catch it off guard. If it is at the net, a hard drive past it is the play.",
      "Hold your nerve in the tiebreak. The last few points of a tight set are where most people rush their shots — slow down, aim carefully, and trust the racket to do the work.",
    ],
    features: [
      "Fast-paced tennis rally against a sharp AI opponent",
      "Drag or swipe to move the racket",
      "Power smash on double-tap for heavier returns",
      "First to seven points wins a set, best of three",
      "Match record saved automatically",
    ],
    faq: [
      {
        q: "Is Racket Rumble free to play?",
        a: "Yes. Racket Rumble is completely free, runs in your browser and shows no ads inside the game. There is nothing to download, install or pay for — just pick up the racket and start swinging.",
      },
      {
        q: "How do I play on mobile?",
        a: "Touch and drag to move the racket. Double-tap the screen to unleash a power smash. The racket follows your finger closely, so small, deliberate drags give you the most control.",
      },
      {
        q: "How do I win a set?",
        a: "First to seven points wins a set, and the match is best-of-three sets. A power smash can change the momentum of a rally, but it leaves your court open if the AI returns it.",
      },
      {
        q: "What is the power smash?",
        a: "Double-tap the screen or the mouse to hit a power smash — a faster, heavier shot that gives the AI less time to react. Mistiming it leaves the court exposed, so use it when you are confident the AI is out of position.",
      },
      {
        q: "Does the game save my results?",
        a: "Yes, your match wins and best performances are saved in your browser automatically, so you can always come back and try to improve your record.",
      },
    ],
  },
  "neon-circuit": {
    tips: [
      "Start from the power source — the glowing orange node — and trace which tiles it can reach. Rotate those tiles first to build a foundation.",
      "Focus on endpoints (tiles with only one connection). They are the hardest to reach, so plan your path toward them early.",
      "Corner tiles are the trickiest. A corner connects two adjacent sides, so rotating it wrong can silently block power from flowing.",
      "Use the power percentage at the bottom of the screen to track your progress. If it stalls, you likely have a single dead tile blocking everything.",
      "Tap the same tile multiple times to cycle through all four rotations. Sometimes the answer is just one more spin.",
    ],
    features: [
      "Pipe-connection puzzle with glowing neon tiles",
      "Four tile shapes: straight, corner, T-junction and cross",
      "Eleven levels scaling from 3x3 up to 5x5 grids",
      "Power percentage readout tracks your progress",
      "Level progress and move counter saved in your browser",
    ],
    faq: [
      {
        q: "How do I play Neon Circuit?",
        a: "Tap any tile on the grid to rotate it ninety degrees clockwise. Your goal is to connect the glowing power source to every tile on the board. When power flows through a tile, it lights up in neon cyan.",
      },
      {
        q: "What do the different tile shapes mean?",
        a: "Straight tiles connect two opposite sides. Corner tiles connect two adjacent sides. T-junction tiles connect three sides. Cross tiles connect all four sides. Each shape has a specific role in directing power flow.",
      },
      {
        q: "What is the orange dot?",
        a: "The orange dot marks the power source. Energy starts here and flows outward through connected tiles. Your job is to make sure it reaches every tile on the grid.",
      },
      {
        q: "How many levels are there?",
        a: "Neon Circuit has 11 levels, starting with small three by three grids and scaling up to five by five. Each level introduces new tile arrangements and challenges.",
      },
      {
        q: "How is my progress tracked?",
        a: "Your unlocked levels are saved in your browser automatically. The move counter shows how many rotations you made, so you can replay levels to find more efficient solutions.",
      },
    ],
  },
  "lumabloom": {
    tips: [
      "Scan the whole garden before your first move. Instead of tapping the nearest pair, look for two matching seeds that line up in the same row or column - a clean line is always worth more than a door-to-door link.",      "Chains are the real win condition. A bloomed flower that touches another seed of the same color ignites it and keeps the chain going, so plan a path that passes through more matching seeds and one move can clear a huge patch.",
      "Spend energy on the longest line you can. Linking two seeds far apart blooms every tile between them, so a long straight row fills far more board than a short one, even if it costs the same single point of energy.",
      "Guard your colour count. Each garden has a fixed palette, so before your energy runs low, check which colors still have two or more seeds left in line - those are the chains that can still rescue a tight round.",
      "Leave low-value colors for the end. If a color has only broken lines left, clear it early while energy is plentiful, and save the colors that can still chain for when you need one big cascade to hit the target.",
    ],
    features: [
      "Bloom a path of neon flowers by linking two matching seeds in a line",
      "Chain reactions that ignite every same-colored seed the path touches",
      "Three gardens - Garden, Meadow and Bloomfield - with rising grid sizes and colors",
      "Energy economy that rewards long, deliberate links over quick taps",
      "Best score saved for every garden, plus offline play with zero ads",
    ],
    faq: [
      {
        q: "Is LumaBloom really free to play?",
        a: "Yes. LumaBloom is completely free, runs directly in your browser and shows no ads inside the game. There is nothing to download, install or pay for - just tap two seeds and start growing.",
      },
      {
        q: "How do I play LumaBloom?",
        a: "Tap a seed pod to select it, then tap a second seed of the same color that lines up with it in the same row or column. Every tile between them blooms into a flower, and matching colors that touch ignite a chain. Bloom the target number of flowers before your energy runs out.",
      },
      {
        q: "What is energy used for?",
        a: "Energy is your limit on moves. Each link between two seeds spends one point of energy, and when energy reaches zero the garden wilts. Plan long, efficient lines so every point of energy blooms as many flowers as possible.",
      },
      {
        q: "How do chains work?",
        a: "When a path of flowers blossoms and touches another seed of the same color, that seed blooms for free and can set off another chain. One well-placed move can cascade across a large part of the garden.",
      },
      {
        q: "How many gardens are there?",
        a: "Three. The Garden is a five by five bed with three colors, the Meadow is a six by six plot with four colors, and Bloomfield is a six by seven field with five colors and a tougher target.",
      },
      {
        q: "Does the game save my best score?",
        a: "Yes. Your best remaining energy for each of the three gardens is saved in your browser automatically, so every round hands you a glowing target to beat on your next attempt.",
      },
    ],
  },
  "hyperlane": {
    tips: [
      "Stay in the middle lanes early. The two outer edges of the road leave little room to react, but the central lanes give you time to read the traffic ahead and pick a clean overtaking line.",
      "Tap one lane at a time instead of darting across two. A single careful lane change clears most of the chaos, while a long sideways dash is when you clip the car you are trying to pass.",
      "Coins are bait, not a magnet. Grabbing every coin takes you across the road and straight into traffic, so collect the ones that sit in your current lane and let risky ones go.",
      "Anticipate the speed build. The road gets faster the longer you survive, so start leaving the overtaking move earlier - by the high-speed stretch, reaction time alone is not enough.",
      "Chain close overtakes for bonus points. Passing several cars in a quick burst banks more points than single skims, so line up two or three rivals in neighbouring lanes before you slice through.",
    ],
    features: [
      "Seven-lane neon freeway that builds speed the longer you survive",
      "Overtake traffic and skim coins to bank a high score",
      "Tap any lane or use arrows / A-D to weave side by side",
      "Personal best distance saved automatically in your browser",
      "Offline play with zero ads - original racing fun from PlayKrux",
    ],
    faq: [
      {
        q: "Is HyperLane really free to play?",
        a: "Yes. HyperLane is completely free, runs directly in your browser and shows no ads inside the game. There is nothing to download, install or pay for - just pick a lane and start racing.",
      },
      {
        q: "How do I control my car?",
        a: "Tap any of the seven lanes to dart your car sideways, or use the left and right arrow keys together with A and D on desktop. The goal is to weave through traffic without touching another car.",
      },
      {
        q: "What makes the road harder?",
        a: "Your engine speed rises the longer you survive, so traffic comes at you faster and the gaps feel tighter. Early runs teach you the lanes, and late runs test your timing under pressure.",
      },
      {
        q: "How do I score points?",
        a: "Every car you overtake earns points, and the coins scattered across the road add more. Bank a high score over a long run, but one collision with traffic ends the race immediately.",
      },
      {
        q: "Does the game save my best distance?",
        a: "Yes. Your best distance is saved in your browser automatically, so every run gives you a glowing goal to smash on your next attempt.",
      },
      {
        q: "Can I play on my phone?",
        a: "Yes. HyperLane works with touch - just tap the lane you want to move to - and with the keyboard on desktop. It runs smoothly in any modern browser.",
      },
    ],
  },
  "twinlume": {
    tips: [
      "Start from the outside and sweep inward. Clearing the outer row first leaves fewer cards to misread later, and you build the grid's skeleton before the middle gets crowded.",      "Say the symbol out loud as you flip it. Naming what you see - star, moon, bolt - anchors it better than a silent glance, and paired positions start to stick after just a few rounds.",
      "Watch the edges between flips. A lot of players only look at the card they just turned. Scanning the whole board while the next card animates is where the real recall advantage lives.",
      "When you find a match, do not rush the third move. Take one beat to review everything you still have memorised, because the board shuffles nothing - your attention just drifts.",
      "Move economy beats speed. Fewer mistakes beat faster taps, so if you are unsure, flip a card you have already seen rather than gambling on an unknown corner. Your best score rewards deliberate play.",
    ],
    features: [
      "Three grid sizes that scale the challenge from warm-up to memory marathon",
      "Eighteen hand-drawn neon symbols, each with its own glow and audio snap",
      "Best time saved for every difficulty in your browser",
      "Move counter and timer that reward deliberate, careful play",
      "Runs offline with zero ads - tap a card and disappear into the light",
    ],
    faq: [
      {
        q: "Is Twinlume really free to play?",
        a: "Yes. Twinlume is completely free, runs directly in your browser and shows no ads inside the game. There is nothing to download, install or pay for - just tap two cards and start matching.",
      },
      {
        q: "How do I play Twinlume?",
        a: "Tap any card to flip it over and reveal its symbol, then tap a second card to look for its twin. If the two symbols match they dissolve in light; if not, they flip back. Clear every pair on the board to finish the round.",
      },
      {
        q: "How many grids are there?",
        a: "Three. Easy is a three by four grid with six pairs for a quick warm-up, Medium is four by four with eight pairs, and Hard is four by six with twelve pairs to stretch your recall.",
      },
      {
        q: "Does the game save my best time?",
        a: "Yes. Your best time for each of the three grid sizes is saved in your browser automatically, so every round hands you a glowing target to beat on your next attempt.",
      },
      {
        q: "Can I play on my phone?",
        a: "Yes. Twinlume is built for both mouse and touch. Tap the cards with your finger on mobile or click them with the mouse on desktop - it runs in any modern browser.",
      },
      {
        q: "Does anything happen when I clear the board?",
        a: "Finishing a board releases a burst of confetti and shows your time and move count. If you set a new best, the board crowns it with a star, then you can jump back to the menu for another round.",
      },
    ],
  },
};

export function getGameContent(slug: string): GameContent | undefined {
  return content[slug];
}
