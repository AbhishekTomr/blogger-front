const initialBlogs = [
    {
        id: 1,
        author: 'imabhishek111@gmail.com',
        title: "The Benefits of Meditation",
        body: "Meditation has been shown to reduce stress and anxiety, improve sleep quality, and increase overall well-being.",
        likes: 500,
        comments: [{
            id: 1,
            email: "jane@example.com",
            comments: "I completely agree! I started meditating a few months ago and it's made a huge difference in my life.",
        }, {
            id: 2,
            email: "john@example.com",
            comments: "I've been meaning to try meditation. Do you have any tips for beginners?",
        }],
        created_ts: new Date("2022-01-01"),
        updated_ts: new Date("2022-01-02")
    },
    {
        id: 2,
        author: 'imabhishek111@gmail.com',
        title: "How to Build a Successful Online Business",
        body: "Building an online business takes hard work, but with the right strategy and mindset, it can be very rewarding.",
        likes: 1000,
        comments: [{
            id: 1,
            email: "jack@example.com",
            comments: "Thanks for sharing these tips! I've been struggling to grow my online business and this is really helpful.",
        }, {
            id: 2,
            email: "jill@example.com",
            comments: "I completely agree with your point about staying focused on your niche. It's tempting to try to do too much and appeal to everyone, but it's better to be an expert in one area.",
        }],
        created_ts: new Date("2022-02-15"),
        updated_ts: new Date("2022-02-20")
    },
    {
        id: 3,
        author: 'imabhishek111@gmail.com',
        title: "The Benefits of a Plant-Based Diet",
        body: "Eating a plant-based diet has been linked to lower rates of heart disease, diabetes, and some cancers, as well as better overall health.",
        likes: 750,
        comments: [{
            id: 1,
            email: "mike@example.com",
            comments: "I've been vegetarian for a few years now and I've definitely noticed a difference in my health. I have more energy and I rarely get sick.",
        }, {
            id: 2,
            email: "sara@example.com",
            comments: "I'm thinking about switching to a plant-based diet but I'm not sure where to start. Do you have any favorite recipes or resources?",
        }],
        created_ts: new Date("2022-03-10"),
        updated_ts: new Date("2022-03-12")
    },
    {
        id: 4,
        author: 'imabhishek111@gmail.com',
        title: "The Benefits of Regular Exercise",
        body: "Regular exercise can improve cardiovascular health, strengthen muscles and bones, and reduce the risk of chronic diseases.",
        likes: 800,
        comments: [{
            id: 1,
            email: "chris@example.com",
            comments: "I try to exercise every day, even if it's just a quick walk. It really helps me stay focused and energized.",
        }, {
            id: 2,
            email: "maria@example.com",
            comments: "I struggle to find the motivation to exercise. Do you have any tips for getting started?",
        }],
        created_ts: new Date("2022-04-05"),
        updated_ts: new Date("2022-04-07")
    }
]

export default initialBlogs;