import { Exercise } from "../../models/index.js"

class ExercisesSeeder {
    static async seed() {

    const exercisesData = [
        {
            name: "Dumbbell Chest Press",
            description: "This exercise focuses on developing strength and size in the chest muscles.",
            muscleGroup: "Chest",
            bodyFunction: "Push",
            instructions:"Lie on a flat bench with a dumbbell in each hand, positioned at chest level. Press the dumbbells up until your arms are fully extended. Lower the dumbbells back down to chest level and repeat.",
            equipment: "Dumbbells, Flat bench",
            notes: "Keep your back flat on the bench and maintain control throughout the movement."
        },
        {
            name: "Barbell Squats",
            description: "This exercise targets the lower body, primarily the quads, glutes, and hamstrings.",
            muscleGroup: "Legs",
            bodyFunction:"Squat",
            instructions: "Stand with your feet shoulder-width apart, toes pointing slightly outward. Hold a barbell across your upper back and shoulders. Bend at the knees and hips, lowering your body until your thighs are parallel to the ground. Push through your heels to return to the starting position.",
            equipment: "Barbell, Squat rack",
            notes: "Maintain proper form, keeping your knees aligned with your toes and your back straight."
        },
        {
            name: "Plank Hold",
            description: "This exercise is a static core-strengthening exercise that engages the abs, back, and shoulders.",
            muscleGroup: "Core",
            bodyFunction: "Stability",
            instructions: "Start in a push-up position, with your hands directly under your shoulders. Lower onto your forearms, keeping your elbows aligned with your shoulders. Engage your core and hold your body in a straight line from head to toe. Hold the position for the desired duration.",
            notes: "Breathe steadily and focus on maintaining proper alignment."
        },
        {
            name: "Pull-Ups",
            description: "This exercise targets the back, specifically the lats, along with the biceps and shoulders.",
            muscleGroup: "Back, Biceps, Shoulders",
            bodyFunction: "Pull",
            instructions: "Grab a pull-up bar with an overhand grip, hands slightly wider than shoulder-width apart. Hang with your arms fully extended, shoulders down, and core engaged. Pull your body up until your chin is above the bar. Lower yourself back down with control.",
            equipment: "Pull-up bar",
            notes: "If unable to do a full pull-up, modify by using an assisted pull-up machine or resistance bands."
        },
        {
            name: "Dumbbell Bicep Curls",
            description: "This exercise targets the biceps and helps build arm strength and size.",
            muscleGroup: "Biceps",
            bodyFunction: "Curl",
            instructions: "Stand with a dumbbell in each hand, arms fully extended by your sides, palms facing forward. Curl the dumbbells up towards your shoulders, keeping your elbows close to your body. Squeeze your biceps at the top of the movement. Lower the dumbbells back down and repeat.",
            equipment: "Dumbbells",
            notes: "Focus on controlled movements and avoid swinging or using momentum."
        },
        {
            name: "Overhead Shoulder Press",
            description: "This exercise targets the shoulder muscles, primarily the deltoids.",
            muscleGroup: "Shoulders",
            bodyFunction: "Press",
            instructions: "Stand or sit with a dumbbell in each hand, palms facing forward, and elbows bent at a 90-degree angle. Press the dumbbells overhead until your arms are fully extended. Lower the dumbbells back down to shoulder level and repeat.",
            equipment: "Dumbbells",
            notes: "Keep your core engaged and maintain proper form throughout the exercise."
        },
        {
            name: "Walking Lunges",
            description: "This exercise targets the legs, particularly the quads, glutes, and hamstrings, while also engaging the core for stability.",
            muscleGroup: "Legs, Core",
            bodyFunction: "Lunge",
            instructions: "Stand tall with your feet hip-width apart. Take a step forward with your right leg, lowering your body into a lunge position. Push through your front heel and bring your back foot forward, stepping into the next lunge. Continue alternating legs, walking forward with each lunge.",
            notes: "Maintain an upright posture, keep your front knee aligned with your ankle, and take controlled steps."
        },
        {
            name: "Barbell Bench Press",
            description: "This exercise targets the chest muscles and is an effective compound movement for building upper body strength.",
            muscleGroup: "Chest",
            bodyFunction: "Press",
            instructions: "Lie on a flat bench with your feet firmly on the ground and your back pressed against the bench. Grip the barbell slightly wider than shoulder-width apart, with your palms facing forward. Lower the barbell to your chest, then press it back up to full arm extension. Repeat for the desired number of repetitions.",
            equipment: "Barbell, Bench",
            notes: "Use a spotter when lifting heavy weights, and maintain proper form throughout the exercise."
        },
        {
            name: "Russian Twists",
            description: "This exercise targets the oblique muscles and helps improve rotational core strength.",
            muscleGroup: "Abs, Obliques",
            bodyFunction: "Rotation",
            instructions: "Sit on the floor with your knees bent, feet lifted off the ground, and torso leaning back at a 45-degree angle. Clasp your hands together in front of your chest. Twist your torso to the right, bringing your clasped hands towards the right side of your body. Return to the center, then twist to the left. Repeat in a controlled manner, alternating sides.",
            notes: "Engage your core throughout the exercise and avoid straining your neck or using momentum."
        },
        {
            name: "Deadlifts",
            description: "This exercise targets multiple muscle groups, including the lower back, glutes, hamstrings, and core, while also improving overall strength and posture.",
            muscleGroup: "Back, Glutes, Hamstrings, Core",
            bodyFunction: "Pull",
            instructions: "Stand with your feet hip-width apart and a barbell in front of you on the floor. Bend at the hips and knees, keeping your back straight, and grasp the barbell with an overhand grip, hands slightly wider than shoulder-width apart. Push through your heels, straighten your legs, and lift the barbell up, extending your hips and bringing your torso upright. Lower the barbell back down to the floor, maintaining control. Repeat for the desired number of repetitions.",
            equipment: "Barbell, Weight plates",
            notes: "Focus on maintaining proper form, keeping your back straight, and engaging your core throughout the movement."
        },
        {
            name: "Tricep Dips",
            description: "This exercise targets the triceps, helping to strengthen and tone the back of the arms.",
            muscleGroup: "Triceps",
            bodyFunction: "Push",
            instructions: "Position your hands shoulder-width apart on a stable surface, such as parallel bars or the edge of a bench. Extend your legs out in front of you and lower your body, bending your elbows to a 90-degree angle. Push through your hands to straighten your arms and return to the starting position. Repeat for the desired number of repetitions.",
            equipment: "Parallel bars, Bench",
            notes: "Keep your elbows close to your body and avoid shrugging your shoulders."
        },
        {
            name: "Leg Press",
            description: "This exercise targets the lower body, specifically the quadriceps, hamstrings, and glutes, and is performed using a leg press machine.",
            muscleGroup: "Legs, Glutes",
            bodyFunction: "Press",
            instructions: "Sit on the leg press machine with your back against the backrest and your feet on the footplate, shoulder-width apart. Extend your legs, pushing the footplate away from you, until your legs are fully extended but not locked. Bend your knees to lower the footplate back down, returning to the starting position. Repeat for the desired number of repetitions.",
            equipment: "Leg press machine",
            notes: "Adjust the seat and footplate position to ensure proper alignment of your knees and avoid locking your knees at the top of the movement."
        },
        {
            name: "Lat Pulldowns",
            description: "This exercise targets the back muscles, specifically the latissimus dorsi, and helps improve upper body strength and posture.",
            muscleGroup: "Back",
            bodyFunction: "Pull",
            instructions: "Sit at a lat pulldown machine with your knees positioned under the leg pad and your hands grasping the wide bar overhead, palms facing forward. Keeping your back straight, pull the bar down towards your chest, squeezing your shoulder blades together. Slowly return the bar to the starting position, extending your arms. Repeat for the desired number of repetitions.",
            equipment: "Lat pulldown machine",
            notes: "Maintain a controlled and smooth movement, avoiding swinging or using excessive momentum."
        },
        {
            name: "Bicycle Crunches",
            description: "This exercise targets the abdominal muscles, particularly the rectus abdominis and obliques, and helps improve core strength and stability.",
            muscleGroup: "Abs, Obliques",
            bodyFunction: "Rotation",
            instructions: "Lie on your back with your hands behind your head and your knees bent, feet lifted off the ground. Lift your shoulder blades off the ground, bringing your right elbow towards your left knee while straightening your right leg. Return to the starting position and repeat, alternating sides. Continue in a pedaling motion, mimicking riding a bicycle.",
            equipment: "None",
            notes: "Engage your core throughout the exercise and avoid pulling on your neck with your hands."
        },
        {
            name: "Seated Dumbbell Shoulder Press",
            description: "This exercise targets the shoulder muscles and is performed while seated, using dumbbells.",
            muscleGroup: "Shoulders",
            bodyFunction: "Press",
            instructions: "Sit on a bench with a dumbbell in each hand, positioned at shoulder level, palms facing forward. Press the dumbbells overhead until your arms are fully extended. Lower the dumbbells back down to shoulder level and repeat.",
            equipment: "Dumbbells, Bench",
            notes: "Keep your core engaged and maintain proper form throughout the exercise."
        },
        {
            name: "Step-Ups",
            description: "This exercise targets the lower body, particularly the quadriceps and glutes, and helps improve leg strength and stability.",
            muscleGroup: "Legs, Glutes",
            bodyFunction: "Step",
            instructions: "Stand facing a step or bench with your feet hip-width apart. Step up onto the step with your right foot, pushing through your heel. Bring your left foot up to meet your right foot on the step. Step back down with your right foot, followed by your left foot. Repeat, alternating the leading foot.",
            equipment: "Step or bench",
            notes: "Maintain an upright posture and avoid using momentum to propel yourself up."
        },
        {
            name: "Hamstring Curls",
            description: "This exercise targets the hamstrings and helps improve leg strength and stability.",
            muscleGroup: "Hamstrings",
            bodyFunction: "Curl",
            instructions: "Lie face down on a leg curl machine, positioning the padded lever against the back of your lower legs. Grasp the handles or sides of the machine for support. Curl your legs up towards your glutes, squeezing your hamstrings. Lower your legs back down in a controlled manner. Repeat for the desired number of repetitions.",
            equipment: "Leg curl machine",
            notes: "Adjust the machine settings to fit your body and maintain proper form throughout the exercise."
        },
        {
            name: "Push-Ups",
            description: "This exercise targets the chest, shoulders, triceps, and core, and is performed using your body weight.",
            muscleGroup: "Chest, Shoulders, Triceps, Core",
            bodyFunction: "Push",
            instructions: "Start in a high plank position with your hands slightly wider than shoulder-width apart, fingers pointing forward. Lower your body towards the ground by bending your elbows, keeping your body straight. Push through your palms to straighten your arms and return to the starting position. Repeat for the desired number of repetitions.",
            equipment: "None",
            notes: "Maintain a strong plank position and engage your core throughout the exercise."
        },
        {
            name: "Standing Calf Raises",
            description: "This exercise targets the calf muscles and helps improve lower leg strength and stability.",
            muscleGroup: "Calves",
            bodyFunction: "Raise",
            instructions: "Stand with your feet hip-width apart, near a wall or support for balance if needed. Raise your heels off the ground, standing on your tiptoes. Hold the raised position briefly, then lower your heels back down. Repeat for the desired number of repetitions.",
            equipment: "None",
            notes: "Focus on controlled movements and avoid bouncing at the bottom of the movement."
        },
        {
            name: "Reverse Crunches",
            description: "This exercise targets the lower abs and helps strengthen the core.",
            muscleGroup: "Abs",
            bodyFunction: "Crunch",
            instructions: "Lie on your back with your legs bent at a 90-degree angle and your hands by your sides. Lift your legs off the ground, bringing your knees towards your chest. Contract your abs to lift your hips off the ground, curling your tailbone towards your belly button. Slowly lower your hips back down to the starting position. Repeat for the desired number of repetitions.",
            equipment: "None",
            notes: "Keep your movements controlled and focus on using your abs to lift your hips off the ground."
        },
        {
            name: "Light Jog",
            description: "This exercise involves a light-paced jogging session to warm up the body and increase heart rate.",
            instructions: "Start with a brisk walk, gradually increase your pace to a light jog, maintain a steady rhythm, and cool down with a walk.",
            notes: "Choose a scenic route or park for an enjoyable jogging experience."
        },
        {
            name: "Sprint Intervals",
            description: "This exercise involves alternating between sprinting and recovery periods to improve speed and endurance.",
            instructions: "Choose a distance or time for sprinting, give maximum effort during the sprint, and recover with a slow jog or walk. Repeat the cycle for a specific number of intervals.",
            notes: "Warm up adequately before starting sprint intervals."
        },
        {
            name: "Soccer Dribbling Drills",
            description: "This exercise focuses on improving dribbling skills in soccer.",
            instructions: "Set up cones or markers and practice dribbling the ball around them using various techniques.",
            equipment: "Soccer ball, Cones/Markers"
        },
        {
            name: "Passing and Receiving",
            description: "This exercise involves practicing accurate passing and receiving skills in soccer.",
            instructions: "Pair up with a teammate and practice passing and receiving the ball with different parts of the body. Focus on accuracy and technique.",
            equipment: "Soccer ball, Cones/Markers",
        },
        {
            name: "Mountain Biking",
            description: "This exercise involves off-road biking on trails and challenging terrains.",
            instructions: "Choose a mountain biking trail, wear appropriate safety gear, and navigate through the terrain while cycling at a comfortable pace.",
            equipment: "Mountain bike, Helmet, Protective gear",
            notes: "Be cautious of obstacles and follow trail etiquettes."
        },
        {
            name: "Endurance Ride",
            description: "This exercise involves a long-distance cycling session to improve endurance and cardiovascular fitness.",
            instructions: "Choose a route or destination, maintain a steady pace, and enjoy a longer cycling session to challenge your endurance.",
            equipment: "Bicycle, Helmet",
            notes: "Stay hydrated and take breaks as needed."
        },
        {
            name: "Basketball Shooting Drills",
            description: "This exercise focuses on improving shooting skills in basketball.",
            instructions: "Practice shooting from different positions on the court, work on accuracy and technique.",
            equipment: "Basketball, Basketball hoop",
        },
        {
            name: "Basketball Dribbling Drills",
            description: "This exercise involves practicing dribbling skills in basketball.",
            instructions: "Perform various dribbling drills, including crossovers, between-the-legs, and behind-the-back dribbles.",
            equipment: "Basketball, Cones/Markers",
        },
        {
            name: "Forehand Stroke",
            description: "This exercise focuses on improving the forehand stroke in tennis.",
            instructions: "Practice the forehand stroke by hitting the ball with proper technique and footwork.",
            equipment: "Tennis racket, Tennis balls",
        },
        {
            name: "Backhand Stroke",
            description: "This exercise involves practicing the backhand stroke in tennis.",
            instructions: "Work on the backhand stroke technique, focusing on control and power.",
            equipment: "Tennis racket, Tennis balls",
        },
        {
            name: "Freestyle Stroke",
            description: "This exercise involves swimming laps using the freestyle stroke.",
            instructions: "Swim using the freestyle stroke technique, maintaining a steady pace.",
            equipment: "Swimsuit, Goggles",
            notes: "Use proper breathing techniques and maintain good form."
        },
        {
            name: "Breaststroke",
            description: "This exercise focuses on swimming laps using the breaststroke technique.",
            instructions: "Swim using the breaststroke technique, coordinating the arm and leg movements.",
            equipment: "Swimsuit, Goggles",
            notes: "Focus on timing and rhythm while swimming breaststroke."
        },
        {
            name: "Downhill Skiing",
            description: "This exercise involves skiing down slopes and mountains.",
            instructions: "Choose a skiing trail or resort, wear appropriate ski gear, and enjoy skiing down the slopes.",
            equipment: "Skis, Ski boots, Ski poles",
            notes: "Follow safety guidelines and be aware of your surroundings."
        },
        {
            name: "Skiing Drills",
            description: "This exercise involves practicing skiing techniques and maneuvers.",
            instructions: "Perform skiing drills to improve technique, such as carving turns, parallel skiing, and moguls.",
            equipment: "Skis, Ski boots, Ski poles",
        },
        {
            name: "Warm-up Routine",
            description: "This exercise involves a series of warm-up exercises to prepare for a soccer match.",
            instructions: "Perform dynamic stretches, light jogging, and agility exercises to warm up the body and activate muscles.",
            notes: "Customize the warm-up routine based on individual needs and preferences."
        },
        {
            name: "Game Strategies",
            description: "This exercise focuses on practicing game strategies and tactics for a soccer match.",
            instructions: "Work on specific game strategies, such as set pieces, attacking plays, and defensive formations."
        },
        {
            name: "Jumping Jacks",
            description: "Jumping jacks are a full-body exercise that increases heart rate and works on coordination.",
            muscleGroup: "Full Body",
            bodyFunction: "Cardio",
            instructions: "Stand with your feet together and arms at your sides. Jump while spreading your legs wide and raising your arms overhead. Jump again, returning to the starting position. Repeat for the desired duration.",
            notes: "Engage your core and keep a consistent pace throughout the exercise."
        },
        {
            name: "Burpees",
            description: "Burpees are a challenging exercise that targets multiple muscle groups and increases cardiovascular endurance.",
            muscleGroup: "Full Body",
            bodyFunction: "Cardio",
            instructions: "Start in a standing position. Squat down, placing your hands on the floor. Jump your feet back into a plank position. Perform a push-up. Jump your feet forward, returning to the squat position. Jump explosively, reaching your arms overhead. Repeat for the desired duration.",
            notes: "Focus on maintaining proper form throughout the exercise and land softly when jumping."
        },
        {
            name: "Mountain Climbers",
            description: "Mountain climbers are a dynamic exercise that targets the core, shoulders, and legs while increasing heart rate.",
            muscleGroup: "Core, Shoulders, Legs",
            bodyFunction: "Cardio",
            instructions: "Start in a plank position with your hands directly under your shoulders. Bring one knee toward your chest, then quickly switch legs, bringing the opposite knee toward your chest. Continue alternating legs in a running motion for the desired duration.",
            notes: "Keep your core engaged and maintain a steady pace throughout the exercise."
        },
        {
            name: "Squat Jumps",
            description: "Squat jumps are a plyometric exercise that targets the lower body and increases power and explosiveness.",
            muscleGroup: "Legs",
            bodyFunction: "Cardio",
            instructions: "Stand with your feet shoulder-width apart. Lower into a squat position, then explosively jump as high as you can. Land softly and immediately lower into another squat. Repeat for the desired duration.",
            notes: "Maintain proper squat form, and use your arms to help generate power during the jump."
        },
        {
            name: "Push-up Variations",
            description: "Push-up variations target the chest, shoulders, and triceps while increasing upper body strength and endurance.",
            muscleGroup: "Chest, Shoulders, Triceps",
            bodyFunction: "Strength",
            instructions: "Choose a push-up variation, such as standard push-ups, wide push-ups, or diamond push-ups. Perform as many reps as possible with good form for 20 seconds, followed by a 10-second rest. Repeat for multiple rounds.",
            notes: "Maintain a straight line from head to toe, engage your core, and lower your chest as close to the ground as possible."
        },
        {
            name: "Plank Jacks",
            description: "Plank jacks are a dynamic plank variation that targets the core, shoulders, and legs.",
            muscleGroup: "Core, Shoulders, Legs",
            bodyFunction: "Cardio",
            instructions: "Start in a plank position with your hands directly under your shoulders. Jump your feet wide apart and then back together, similar to a jumping jack motion. Continue alternating for the desired duration.",
            notes: "Maintain a stable plank position and engage your core throughout the exercise."
        }
    ]
    
    for (const singleExercise of exercisesData) {
        const currentExercise = await Exercise.query().findOne({ name: singleExercise.name})
        if (!currentExercise) {
            await Exercise.query().insert(singleExercise)
        }
    }

    }
}

export default ExercisesSeeder