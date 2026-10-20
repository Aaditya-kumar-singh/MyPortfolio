import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') {
            setIsVisible(true);
            return undefined;
        }

        const target = ref.current;
        if (!target) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold, rootMargin: '-50px 0px -50px 0px' }
        );

        observer.observe(target);
        return () => observer.unobserve(target);
    }, [threshold]);

    return [ref, isVisible];
};

export const useParallax = () => {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        let frame = 0;
        const handleScroll = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(() => {
                setOffsetY(window.pageYOffset);
                frame = 0;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    return offsetY;
};

export const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let frame = 0;
        const updateProgress = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
            frame = 0;
        };
        const handleScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(updateProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    return scrollProgress;
};
