-- Training Programs Table
CREATE TABLE training_programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0,
    students_count INTEGER DEFAULT 0,
    description TEXT,
    features JSONB,
    highlights JSONB,
    image_url VARCHAR(500),
    is_popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enrollments Table
CREATE TABLE enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    program_id UUID REFERENCES training_programs(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20),
    linkedin VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    education VARCHAR(100),
    experience VARCHAR(100),
    motivation TEXT,
    agree_terms BOOLEAN NOT NULL DEFAULT FALSE,
    agree_marketing BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments Table
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_id UUID REFERENCES enrollments(id),
    amount INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    payment_gateway VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
    gateway_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Progress Table
CREATE TABLE student_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_id UUID REFERENCES enrollments(id),
    module_name VARCHAR(255) NOT NULL,
    completion_percentage INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates Table
CREATE TABLE certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_id UUID REFERENCES enrollments(id),
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    issued_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    certificate_url VARCHAR(500),
    is_valid BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_enrollments_email ON enrollments(email);
CREATE INDEX idx_enrollments_program_id ON enrollments(program_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
CREATE INDEX idx_payments_enrollment_id ON payments(enrollment_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_student_progress_enrollment_id ON student_progress(enrollment_id);
CREATE INDEX idx_certificates_enrollment_id ON certificates(enrollment_id);

-- Insert sample training programs
INSERT INTO training_programs (title, category, duration, level, price, original_price, rating, students_count, description, features, highlights, is_popular) VALUES
('Full Stack Web Development', 'development', '6 months', 'Beginner to Advanced', 15999, 24999, 4.8, 1250, 'Master modern web development with React, Node.js, databases, and deployment', 
 '["React.js & Next.js", "Node.js & Express", "MongoDB & PostgreSQL", "AWS Deployment", "Real-time Applications", "API Development"]',
 '["Build 5+ industry projects", "1-on-1 mentorship", "Job placement assistance", "Lifetime course access"]', true),

('Data Science & Analytics', 'data', '5 months', 'Intermediate', 18999, 28999, 4.9, 890, 'Learn data analysis, machine learning, and visualization with Python',
 '["Python & R Programming", "Machine Learning", "Data Visualization", "Statistical Analysis", "Big Data Tools", "Deep Learning Basics"]',
 '["Work on real datasets", "Industry case studies", "Kaggle competitions", "Portfolio development"]', false),

('Mobile App Development', 'development', '4 months', 'Beginner to Intermediate', 12999, 19999, 4.7, 650, 'Build cross-platform mobile apps with React Native and Flutter',
 '["React Native", "Flutter & Dart", "Native iOS/Android", "App Store Deployment", "Push Notifications", "Payment Integration"]',
 '["Publish apps to stores", "Cross-platform development", "UI/UX best practices", "Performance optimization"]', false);
