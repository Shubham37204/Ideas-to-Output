import { MessageCircle, FileText, Image, Code, BookOpen, PenTool, Scissors } from 'lucide-react';

export const toolsData = [
    {
        title: 'AI Chat',
        description: 'Chat with intelligent AI assistants',
        href: '/dialogue',
        icon: <MessageCircle className="w-8 h-8" />,
        color: 'bg-purple-500',
        tags: []
    },
    {
        title: 'Image Creation',
        description: 'Create creative and amazing images from text descriptions with AI',
        href: '/image',
        icon: <Image className="w-8 h-8" />,
        color: 'bg-orange-500',
        tags: []
    },
    {
        title: 'Your Code Helper',
        description: 'Get help with basic coding question with AI',
        href: '/code',
        icon: <Code className="w-8 h-8" />,
        color: 'bg-blue-500',
        tags: []
    },
    {
        title: 'Topic details',
        description: 'Learn about any topic with AI',
        href: '/summary',
        icon: <BookOpen className="w-8 h-8" />,
        color: 'bg-indigo-500',
        tags: []
    },
    {
        title: 'Story Teller',
        description: 'Create creative stories with AI',
        href: '/story',
        icon: <PenTool className="w-8 h-8" />,
        color: 'bg-pink-500',
        tags: []
    }, {
        title: 'Remove Background',
        description: 'Remove Background with AI ',
        href: '/remove-background',
        icon: <Scissors />,
        color: 'bg-pink-500',
        tags: []
    },
    {
        title: 'Image to Text',
        description: 'Extract text from images using AI',
        href: '/image-to-text',
        icon: <FileText className="w-8 h-8" />,
        color: 'bg-emerald-500',
        tags: []
    }
];
