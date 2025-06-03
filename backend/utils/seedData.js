
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/luxemen');
        console.log('MongoDB Connected for seeding');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

const sampleProducts = [
    {
        name: "Diamond Engagement Ring",
        description: "Stunning solitaire diamond engagement ring crafted in 18k white gold",
        price: 125000,
        originalPrice: 150000,
        category: "rings",
        subcategory: "engagement",
        images: [{ url: "/placeholder.svg", alt: "Diamond Ring" }],
        inStock: true,
        stockQuantity: 5,
        specifications: {
            material: "18k White Gold",
            weight: "3.2g",
            gemstone: "1ct Diamond",
            purity: "18k"
        },
        tags: ["diamond", "engagement", "luxury"],
        featured: true
    },
    {
        name: "Gold Chain Necklace",
        description: "Classic 22k gold chain necklace perfect for everyday wear",
        price: 45000,
        originalPrice: 50000,
        category: "necklaces",
        images: [{ url: "/placeholder.svg", alt: "Gold Necklace" }],
        inStock: true,
        stockQuantity: 10,
        specifications: {
            material: "22k Gold",
            weight: "15g",
            purity: "22k"
        },
        tags: ["gold", "chain", "traditional"],
        featured: true
    },
    {
        name: "Pearl Drop Earrings",
        description: "Elegant pearl drop earrings with sterling silver setting",
        price: 8500,
        originalPrice: 10000,
        category: "earrings",
        images: [{ url: "/placeholder.svg", alt: "Pearl Earrings" }],
        inStock: true,
        stockQuantity: 15,
        specifications: {
            material: "Sterling Silver",
            weight: "2.5g",
            gemstone: "Fresh Water Pearls"
        },
        tags: ["pearl", "elegant", "silver"]
    },
    {
        name: "Tennis Bracelet",
        description: "Sparkling tennis bracelet with cubic zirconia stones",
        price: 12000,
        category: "bracelets",
        images: [{ url: "/placeholder.svg", alt: "Tennis Bracelet" }],
        inStock: true,
        stockQuantity: 8,
        specifications: {
            material: "Sterling Silver",
            weight: "8g",
            gemstone: "Cubic Zirconia"
        },
        tags: ["bracelet", "tennis", "sparkling"]
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});

        // Create admin user
        const adminUser = new User({
            fullname: "Admin User",
            email: "admin@luxemen.com",
            phonenumber: "+919876543210",
            password: "admin123",
            role: "admin"
        });
        await adminUser.save();

        // Create sample user
        const sampleUser = new User({
            fullname: "John Doe",
            email: "john@example.com",
            phonenumber: "+919876543211",
            password: "user123"
        });
        await sampleUser.save();

        // Create sample products
        await Product.insertMany(sampleProducts);

        console.log('✅ Database seeded successfully!');
        console.log('👤 Admin: admin@luxemen.com / admin123');
        console.log('👤 User: john@example.com / user123');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

// Run seeding if this file is executed directly
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase };
