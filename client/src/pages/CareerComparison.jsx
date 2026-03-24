import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import './CareerComparison.css';

const mockCareerTreeData = {
    id: 'root',
    role: 'Software Engineer',
    salary: '$90k - $120k',
    demand: 'high',
    children: [
        {
            id: 'frontend',
            role: 'Frontend Engineer',
            salary: '$95k - $135k',
            demand: 'medium',
            children: [
                { id: 'uiux', role: 'UI/UX Engineer', salary: '$105k - $145k', demand: 'medium', children: [] },
                { id: 'webgl', role: 'WebGL / WebXR Dev', salary: '$115k - $160k', demand: 'high', children: [] }
            ]
        },
        {
            id: 'backend',
            role: 'Backend Engineer',
            salary: '$100k - $140k',
            demand: 'high',
            children: [
                { id: 'data', role: 'Data Engineer', salary: '$120k - $160k', demand: 'high', children: [] },
                { id: 'cloud', role: 'Cloud Architect', salary: '$130k - $175k', demand: 'high', children: [] }
            ]
        },
        {
            id: 'devops',
            role: 'DevOps Engineer',
            salary: '$110k - $150k',
            demand: 'high',
            children: [
                { id: 'sre', role: 'Site Reliability Eng', salary: '$125k - $165k', demand: 'high', children: [] },
                { id: 'sec', role: 'Security DevSecOps', salary: '$135k - $180k', demand: 'high', children: [] }
            ]
        }
    ]
};

const TreeNode = ({ node, index, level }) => {
    return (
        <motion.div 
            className="tree-node"
            id={`node-${node.id}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
                duration: 0.7, 
                delay: level * 0.4 + index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
            }}
            whileHover={{ scale: 1.05 }}
            style={{ zIndex: 10 - level }}
        >
            <div className="node-title">{node.role}</div>
            <div className="node-salary">{node.salary}</div>
            <div className={`node-demand ${node.demand}`}>
                {node.demand === 'high' ? 'High Demand' : 'Avg Demand'}
            </div>
            {/* Ambient subtle float animation */}
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
                style={{ position: 'absolute', inset: 0, zIndex: -1, borderRadius: '16px' }}
            />
        </motion.div>
    );
};

const TreeLevel = ({ nodes, level }) => {
    return (
        <div className="tree-level">
            {nodes.map((node, i) => (
                <div key={node.id} className="tree-node-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TreeNode node={node} index={i} level={level} />
                    {node.children && node.children.length > 0 && (
                        <div style={{ marginTop: '4rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <TreeLevel nodes={node.children} level={level + 1} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Component to draw the SVG links between the React DOM nodes
const TreeLinks = () => {
    const [links, setLinks] = useState([]);
    const containerRef = useRef(null);

    const updateLinks = () => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        
        const newLinks = [];
        
        const traverse = (node) => {
            if (!node.children) return;
            const parentElement = document.getElementById(`node-${node.id}`);
            if (!parentElement) return;
            
            const parentRect = parentElement.getBoundingClientRect();
            // Start bottom center of parent
            const startX = parentRect.left + parentRect.width / 2 - containerRect.left;
            const startY = parentRect.bottom - containerRect.top;

            node.children.forEach(child => {
                const childElement = document.getElementById(`node-${child.id}`);
                if (!childElement) return;

                const childRect = childElement.getBoundingClientRect();
                // End top center of child
                const endX = childRect.left + childRect.width / 2 - containerRect.left;
                const endY = childRect.top - containerRect.top;

                // Bezier control points for smooth swoop
                const cp1X = startX;
                const cp1Y = startY + 50;
                const cp2X = endX;
                const cp2Y = endY - 50;

                newLinks.push(`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`);
                
                traverse(child);
            });
        };

        traverse(mockCareerTreeData);
        setLinks(newLinks);
    };

    useEffect(() => {
        // Wait for nodes to render and animate
        const timer = setTimeout(updateLinks, 100);
        window.addEventListener('resize', updateLinks);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateLinks);
        };
    }, []);

    return (
        <svg className="tree-svg-layer" ref={containerRef}>
            {links.map((d, i) => (
                <motion.path 
                    key={i} 
                    d={d} 
                    className="tree-path"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeInOut" }}
                />
            ))}
        </svg>
    );
};


const CareerComparison = () => {
    return (
        <div className="career-comparison-page">
            <Navbar />
            
            <div className="ambient-glow glow-1"></div>
            <div className="ambient-glow glow-2"></div>

            <main className="career-comparison-content">
                <PageHeader 
                    title="Career Comparison" 
                    subtitle="Visualize and compare multiple career trajectories side-by-side." 
                    badge="Pathways"
                />

                <div className="tree-container">
                    <TreeLinks />
                    <div className="tree-nodes-layer">
                        <TreeLevel nodes={[mockCareerTreeData]} level={0} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CareerComparison;
