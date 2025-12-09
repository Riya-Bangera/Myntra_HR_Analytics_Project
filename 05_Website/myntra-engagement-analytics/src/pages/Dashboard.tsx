import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, TrendingUp, Users, Lightbulb, Target, Briefcase, MessageSquare, CheckCircle2, Calendar, Award, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [animatedMetrics, setAnimatedMetrics] = useState({
    engagement: 0,
    participation: 0,
    topBUs: 0,
    careerGrowth: 0
  });
  const [animatedROI, setAnimatedROI] = useState({
    investment: 0,
    value: 0,
    multiple: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      engagement: 3.93,
      participation: 89,
      topBUs: 4.13,
      careerGrowth: 3.61
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedMetrics({
        engagement: Number((targets.engagement * progress).toFixed(2)),
        participation: Math.floor(targets.participation * progress),
        topBUs: Number((targets.topBUs * progress).toFixed(2)),
        careerGrowth: Number((targets.careerGrowth * progress).toFixed(2))
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedMetrics(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
            
            // Trigger ROI animation when ROI card becomes visible
            if (entry.target.id === 'roi-card') {
              const duration = 2000;
              const steps = 60;
              const interval = duration / steps;
              
              const targets = {
                investment: 15,
                value: 50,
                multiple: 5
              };
              
              let currentStep = 0;
              const timer = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                
                setAnimatedROI({
                  investment: Math.floor(targets.investment * progress),
                  value: Math.floor(targets.value * progress),
                  multiple: Number((targets.multiple * progress).toFixed(1))
                });
                
                if (currentStep >= steps) {
                  clearInterval(timer);
                  setAnimatedROI(targets);
                }
              }, interval);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const trendData = [
    { quarter: 'Q1 2024', Fashion: 4.05, Beauty: 3.80, Tech: 4.05, Supply: 3.75, Customer: 3.78 },
    { quarter: 'Q2 2024', Fashion: 4.09, Beauty: 3.84, Tech: 4.09, Supply: 3.78, Customer: 3.82 },
    { quarter: 'Q3 2024', Fashion: 4.13, Beauty: 3.88, Tech: 4.13, Supply: 3.82, Customer: 3.86 }
  ];

  const buPerformanceData = [
    { name: 'Fashion', score: 4.13, fill: 'hsl(var(--primary))' },
    { name: 'Tech & Product', score: 4.13, fill: 'hsl(var(--secondary))' },
    { name: 'Beauty', score: 3.88, fill: 'hsl(var(--chart-3))' },
    { name: 'Customer Experience', score: 3.86, fill: 'hsl(var(--chart-5))' },
    { name: 'Supply Chain', score: 3.82, fill: 'hsl(var(--warning))' }
  ];

  const dimensionData = [
    { dimension: 'Collaboration', score: 4.06, fill: 'hsl(142, 76%, 36%)' }, // Green
    { dimension: 'Work-Life', score: 4.02, fill: 'hsl(160, 84%, 39%)' }, // Teal
    { dimension: 'Leadership', score: 3.99, fill: 'hsl(221, 83%, 53%)' }, // Blue
    { dimension: 'Culture', score: 3.94, fill: 'hsl(262, 83%, 58%)' }, // Purple
    { dimension: 'Manager', score: 3.84, fill: 'hsl(280, 65%, 60%)' }, // Violet
    { dimension: 'Innovation', score: 3.84, fill: 'hsl(199, 89%, 48%)' }, // Cyan
    { dimension: 'Recognition', score: 3.79, fill: 'hsl(38, 92%, 50%)' }, // Orange
    { dimension: 'Career Growth', score: 3.61, fill: 'hsl(0, 84%, 60%)' } // Red
  ];

  const radarData = [
    { dimension: 'Collaboration', score: 4.06 },
    { dimension: 'Work-Life', score: 4.02 },
    { dimension: 'Leadership', score: 3.99 },
    { dimension: 'Culture', score: 3.94 },
    { dimension: 'Manager', score: 3.84 },
    { dimension: 'Innovation', score: 3.84 },
    { dimension: 'Recognition', score: 3.79 },
    { dimension: 'Career Growth', score: 3.61 }
  ];

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <img src="\public\myntra-logo.png" alt="Myntra Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold gradient-text">MyPulse 9.0</span>
            </div>

            <div className="hidden md:flex space-x-8">
              {['Home', 'Insights', 'Analysis', 'Recommendations', 'Roadmap'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {['Home', 'Insights', 'Analysis', 'Recommendations', 'Roadmap'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 gradient-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Employee Engagement Analysis
            </h1>
            <p className="text-xl text-white/90">
              Strategic HR Analytics Project • Myntra Business Units 2024
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card 
              id="metric-card-1"
              data-animate
              className={`glass-card border-primary/30 transition-all duration-700 ${
                visibleSections.has('metric-card-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {animatedMetrics.engagement}/5
                </div>
                <div className="text-sm text-muted-foreground mb-1">Overall Engagement Score</div>
                <div className="text-xs text-success flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  +3.4% vs Q1
                </div>
              </CardContent>
            </Card>

            <Card 
              id="metric-card-2"
              data-animate
              className={`glass-card border-secondary/30 transition-all duration-700 delay-100 ${
                visibleSections.has('metric-card-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-secondary mb-2">
                  {animatedMetrics.participation}%
                </div>
                <div className="text-sm text-muted-foreground mb-1">Participation Rate</div>
                <div className="text-xs text-success flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  +5% vs Q1
                </div>
              </CardContent>
            </Card>

            <Card 
              id="metric-card-3"
              data-animate
              className={`glass-card border-success/30 transition-all duration-700 delay-200 ${
                visibleSections.has('metric-card-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-success mb-2">
                  {animatedMetrics.topBUs}/5
                </div>
                <div className="text-sm text-muted-foreground mb-1">Top BUs</div>
                <div className="text-xs text-muted-foreground">Fashion & Tech</div>
              </CardContent>
            </Card>

            <Card 
              id="metric-card-4"
              data-animate
              className={`glass-card border-warning/30 transition-all duration-700 delay-300 ${
                visibleSections.has('metric-card-4') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-warning mb-2">
                  {animatedMetrics.careerGrowth}/5
                </div>
                <div className="text-sm text-muted-foreground mb-1">Career Growth</div>
                <div className="text-xs text-destructive">#1 Priority</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card 
              id="key-findings"
              data-animate
              className={`gradient-primary text-white transition-all duration-700 $\{
                visibleSections.has('key-findings') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-3">Key Findings</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Engagement improved to 3.93/5</li>
                  <li>• Participation rate up to 89%</li>
                  <li>• Fashion & Tech leading at 4.13/5</li>
                  <li>• Career Growth needs focus (3.61/5)</li>
                  <li>• Supply Chain shows opportunity</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              id="top-recommendations"
              data-animate
              className={`gradient-secondary text-white transition-all duration-700 delay-100 $\{
                visibleSections.has('top-recommendations') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="text-3xl mb-4">💡</div>
                <h3 className="text-xl font-bold mb-3">Top 3 Recommendations</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Career Pathing Program</li>
                  <li>• Best Practice Exchange</li>
                  <li>• Innovation Time Allocation</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              id="expected-impact"
              data-animate
              className={`gradient-success text-white transition-all duration-700 delay-200 $\{
                visibleSections.has('expected-impact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Expected Impact</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Engagement target: 4.05+</li>
                  <li>• Attrition reduction: 12-15%</li>
                  <li>• Career Growth improvement</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('insights')}
              className="gradient-primary text-white hover:opacity-90 transition-opacity"
            >
              View Insights
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>
      <section id="insights" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Engagement Insights</h2>
            <p className="text-muted-foreground">Positive momentum across all quarters</p>
          </div>

          <Card 
            id="trend-chart"
            data-animate
            className={`mb-8 transition-all duration-700 ${
              visibleSections.has('trend-chart') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Quarterly Engagement Trends</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis domain={[3.5, 4.2]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Fashion" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="Beauty" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                  <Line type="monotone" dataKey="Tech" stroke="hsl(var(--secondary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="Supply" stroke="hsl(var(--warning))" strokeWidth={2} />
                  <Line type="monotone" dataKey="Customer" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-accent rounded-lg">
                <p className="text-sm text-accent-foreground">
                  💡 <strong>Insight:</strong> Consistent improvement demonstrates organizational initiatives are having positive impact
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            id="bu-performance-chart"
            data-animate
            className={`transition-all duration-700 delay-100 ${
              visibleSections.has('bu-performance-chart') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Business Unit Performance Q3 2024</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={buPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[3.5, 4.2]} />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-accent rounded-lg">
                <p className="text-sm text-accent-foreground">
                  💡 <strong>Insight:</strong> 0.31 point gap between highest and lowest - opportunity for best practice sharing
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="analysis" className="py-16 px-4 sm:px-6 lg:px-8 gradient-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dimension Analysis</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card 
              id="dimension-bar-chart"
              data-animate
              className={`glass-card transition-all duration-700 ${
                visibleSections.has('dimension-bar-chart') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">8 Dimensions Performance</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={dimensionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dimension" angle={-45} textAnchor="end" height={100} />
                    <YAxis domain={[3.5, 4.1]} />
                    <Tooltip />
                    <Bar dataKey="score" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card 
              id="dimension-radar-chart"
              data-animate
              className={`glass-card transition-all duration-700 delay-100 ${
                visibleSections.has('dimension-radar-chart') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Dimension Radar View</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="dimension" />
                    <PolarRadiusAxis domain={[3.5, 4.1]} />
                    <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card 
              id="strength-card"
              data-animate
              className={`bg-green-50 border-2 border-green-500 transition-all duration-700 ${
                visibleSections.has('strength-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-600 mr-2" />
                  <h3 className="font-bold text-green-700 text-lg">Strengths (Maintain)</h3>
                </div>
                <ul className="space-y-2 text-sm text-green-900 font-medium">
                  <li>• Collaboration: 4.06</li>
                  <li>• Work-Life Balance: 4.02</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              id="moderate-card"
              data-animate
              className={`bg-blue-50 border-2 border-blue-500 transition-all duration-700 delay-100 ${
                visibleSections.has('moderate-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mr-2" />
                  <h3 className="font-bold text-blue-700 text-lg">Moderate (Monitor)</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-900 font-medium">
                  <li>• Innovation: 3.84</li>
                  <li>• Recognition: 3.79</li>
                  <li>• Manager Support: 3.84</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              id="critical-card"
              data-animate
              className={`bg-red-50 border-2 border-red-500 transition-all duration-700 delay-200 ${
                visibleSections.has('critical-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-600 mr-2" />
                  <h3 className="font-bold text-red-700 text-lg">Critical Focus (Urgent)</h3>
                </div>
                <ul className="space-y-2 text-sm text-red-900 font-medium">
                  <li>• Career Growth: 3.61</li>
                  <li className="text-red-700 font-bold">← #1 Priority</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MessageSquare className="text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Employee Voice: Career Growth</h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm italic mb-1">"I don't see a clear path to the next level"</p>
                    <p className="text-xs text-muted-foreground">- Supply Chain Team Member</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm italic mb-1">"Promotions seem unclear - what criteria do I need to meet?"</p>
                    <p className="text-xs text-muted-foreground">- Fashion BU Associate</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm italic mb-1">"Tech team has clear E1-E5 levels, we don't have that structure"</p>
                    <p className="text-xs text-muted-foreground">- Operations Team Lead</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle2 className="text-success mr-2" />
                  <h3 className="text-xl font-semibold">What's Working Well</h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-success pl-4 py-2">
                    <p className="text-sm italic mb-1">"Flexible work hours help me balance family commitments"</p>
                    <p className="text-xs text-muted-foreground">- Beauty BU Team Member</p>
                  </div>
                  <div className="border-l-4 border-success pl-4 py-2">
                    <p className="text-sm italic mb-1">"Team collaboration is excellent, we support each other"</p>
                    <p className="text-xs text-muted-foreground">- Tech Team Member</p>
                  </div>
                  <div className="border-l-4 border-success pl-4 py-2">
                    <p className="text-sm italic mb-1">"Leadership is transparent and communicates well"</p>
                    <p className="text-xs text-muted-foreground">- Customer Experience Associate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="gradient-secondary text-white">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">Why Tech & Product BU Outperforms (4.13/5)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-start">
                  <CheckCircle2 className="mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Clear IC vs Management career tracks documented</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Innovation time built into quarterly sprints</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Regular demo days for visibility and recognition</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Strong technical culture and challenging projects</span>
                </div>
                <div className="flex items-start md:col-span-2">
                  <CheckCircle2 className="mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Frequent manager career check-ins</span>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="font-semibold">💡 Opportunity: Adapt these practices for other BUs</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="recommendations" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Strategic Recommendations</h2>
            <p className="text-muted-foreground">Data-driven interventions for maximum impact</p>
          </div>

          <div className="space-y-8 mb-8">
            <Card 
              id="recommendation-1"
              data-animate
              className={`transition-all duration-700 ${
                visibleSections.has('recommendation-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Briefcase size={32} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold mr-3">#1</span>
                      <h3 className="text-2xl font-bold">Career Pathing Program</h3>
                    </div>
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4">
                      <p className="text-sm text-destructive font-semibold">⚠️ Problem: Career Growth scored 3.61/5 - lowest dimension</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Solution Components:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Document career frameworks for all BUs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Create skill matrices and competency maps</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Launch career development workshops</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Implement mentorship program</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-success">Expected Impact:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <TrendingUp className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Career Growth score: 3.61 → 3.85+</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Voluntary attrition: ↓ 12-15%</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">90% employees with career plans</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-secondary/10 px-4 py-2 rounded-lg">
                    <span className="text-sm font-semibold">Timeline:</span>
                    <span className="text-sm ml-2">Q4 2024 design → Q1 2025 pilot → Q2 2025 scale</span>
                  </div>
                  <div className="bg-warning/10 px-4 py-2 rounded-lg">
                    <span className="text-sm font-semibold">Investment:</span>
                    <span className="text-sm ml-2">₹3-6L + time</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              id="recommendation-2"
              data-animate
              className={`transition-all duration-700 delay-100 ${
                visibleSections.has('recommendation-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-full gradient-secondary flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Users size={32} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold mr-3">#2</span>
                      <h3 className="text-2xl font-bold">Cross-BU Best Practice Exchange</h3>
                    </div>
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4">
                      <p className="text-sm text-destructive font-semibold">⚠️ Problem: 0.31 point gap between highest and lowest BUs</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Solution Components:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Document Tech BU best practices</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Monthly cross-BU learning sessions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Rotation program for high performers</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-success">Expected Impact:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <TrendingUp className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">BU score gap: &lt; 0.25 points</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Innovation score: 3.84 → 3.95</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Collaboration: ↑ 10%</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-secondary/10 px-4 py-2 rounded-lg">
                    <span className="text-sm font-semibold">Timeline:</span>
                    <span className="text-sm ml-2">Q4 2024 docs → Q1 2025 launch</span>
                  </div>
                  <div className="bg-success/10 px-4 py-2 rounded-lg">
                    <span className="text-sm font-semibold">Investment:</span>
                    <span className="text-sm ml-2">Minimal (internal only)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              id="recommendation-3"
              data-animate
              className={`transition-all duration-700 delay-200 ${
                visibleSections.has('recommendation-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-full gradient-success flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Lightbulb size={32} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <span className="bg-success text-white px-3 py-1 rounded-full text-sm font-bold mr-3">#3</span>
                      <h3 className="text-2xl font-bold">Innovation Time Allocation</h3>
                    </div>
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4">
                      <p className="text-sm text-destructive font-semibold">⚠️ Problem: Innovation 3.84/5, non-Tech teams feel constrained</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Solution Components:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Allocate 4 hours/month for innovation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Create idea submission system</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Quarterly innovation showcase</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-success">Expected Impact:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <TrendingUp className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">Innovation score: 4.0+</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">100+ ideas submitted/year</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">₹50L+ value creation</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-secondary/10 px-4 py-2 rounded-lg">
                    <span className="text-sm font-semibold">Timeline:</span>
                    <span className="text-sm ml-2">Q1 2025 pilot → Q2 2025 company-wide</span>
                  </div>
                  <div className="bg-success/10 px-4 py-2 rounded-lg">
                    <span className="text-sm font-semibold">Investment:</span>
                    <span className="text-sm ml-2">Time only (no budget)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card 
            id="roi-card"
            data-animate
            className={`gradient-success text-white text-center transition-all duration-700 ${
              visibleSections.has('roi-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Return on Investment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="transform transition-all duration-300 hover:scale-110">
                  <div className="text-4xl font-bold mb-2">₹{animatedROI.investment > 10 ? '10-' : ''}{animatedROI.investment}L</div>
                  <div className="text-sm opacity-90">Total Investment</div>
                </div>
                <div className="transform transition-all duration-300 hover:scale-110">
                  <div className="text-4xl font-bold mb-2">₹{animatedROI.value}L+</div>
                  <div className="text-sm opacity-90">Expected Value</div>
                </div>
                <div className="transform transition-all duration-300 hover:scale-110">
                  <div className="text-4xl font-bold mb-2">{animatedROI.multiple > 3 ? '3-' : ''}{animatedROI.multiple}x</div>
                  <div className="text-sm opacity-90">ROI Multiple</div>
                </div>
              </div>
              <p className="mt-6 text-sm opacity-90">
                Retention savings + productivity gains + innovation value creation
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="roadmap" className="py-16 px-4 sm:px-6 lg:px-8 gradient-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Implementation Roadmap</h2>
            <p className="text-white/90">90-day quick wins & 6-month execution plan</p>
          </div>

          {/* Visual Road Connection */}
          <div className="relative mb-12">
            {/* Road Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-white/30 hidden lg:block" style={{ top: '32px' }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Q4 2024 */}
              <Card 
                id="q4-card"
                data-animate
                className={`glass-card transition-all duration-700 ${
                  visibleSections.has('q4-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto shadow-lg border-4 border-white">
                    Q4
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Oct-Dec 2024</h3>
                  <p className="text-sm text-center text-muted-foreground mb-4">Foundation & Planning</p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <CheckCircle2 className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Career framework design</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <CheckCircle2 className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Manager training kickoff</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <CheckCircle2 className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Best practice documentation</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <CheckCircle2 className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Communication campaign</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Q1 2025 */}
              <Card 
                id="q1-card"
                data-animate
                className={`glass-card transition-all duration-700 delay-100 ${
                  visibleSections.has('q1-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto shadow-lg border-4 border-white">
                    Q1
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Jan-Mar 2025</h3>
                  <p className="text-sm text-center text-muted-foreground mb-4">Pilot Launch</p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Career program pilot (2 BUs)</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Innovation time launch</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>First cross-BU learning session</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Quarterly pulse survey</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Q2 2025 */}
            <Card 
              id="q2-card"
              data-animate
              className={`glass-card transition-all duration-700 delay-200 ${
                visibleSections.has('q2-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto shadow-lg border-4 border-white">
                  Q2
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Apr-Jun 2025</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">Scale & Expand</p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-chart-5 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Scale career program company-wide</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-chart-5 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>First innovation showcase</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-chart-5 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Measure interim impact</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-chart-5 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Refine based on feedback</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Q3 2025 */}
            <Card 
              id="q3-card"
              data-animate
              className={`glass-card transition-all duration-700 delay-300 ${
                visibleSections.has('q3-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto shadow-lg border-4 border-white">
                  Q3
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Jul-Sep 2025</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">Measure & Celebrate</p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>MyPulse 10.0 full survey</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Measure final impact vs baseline</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Celebrate wins and iterate</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Plan continuous improvement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

          <Card 
            id="success-metrics"
            data-animate
            className={`glass-card transition-all duration-700 ${
              visibleSections.has('success-metrics') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Success Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-4 flex items-center">
                    <Calendar className="mr-2" size={20} />
                    Leading Indicators (Monthly)
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Calendar className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">Employees with career plans (90% by Month 3)</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">Manager training completion (100%)</span>
                    </li>
                    <li className="flex items-start">
                      <Lightbulb className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">Innovation project submissions (30+/quarter)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">Workshop attendance rate (70%+)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-secondary mb-4 flex items-center">
                    <Target className="mr-2" size={20} />
                    Lagging Indicators (Quarterly)
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Target className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">Overall engagement: 3.93 → 4.05+</span>
                    </li>
                    <li className="flex items-start">
                      <Briefcase className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">Career Growth: 3.61 → 3.85+</span>
                    </li>
                    <li className="flex items-start">
                      <Lightbulb className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">Innovation: 3.84 → 4.0+</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">Voluntary attrition: ↓ 12-15%</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="text-secondary mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">BU score gap: &lt; 0.25 points</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <footer className="py-16 px-4 sm:px-6 lg:px-8 gradient-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Next Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Card 1: Stakeholder Alignment */}
            <Card 
              id="next-step-1"
              data-animate
              className={`glass-card border-l-4 border-pink-500 transition-all duration-700 ${
                visibleSections.has('next-step-1') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Stakeholder Alignment</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm">
                        <span className="text-pink-500 mr-2">›</span>
                        <span>Present findings to HRBP team & leadership</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="text-pink-500 mr-2">›</span>
                        <span>Secure sponsorship and resource allocation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Pilot Planning */}
            <Card 
              id="next-step-2"
              data-animate
              className={`glass-card border-l-4 border-pink-500 transition-all duration-700 delay-100 ${
                visibleSections.has('next-step-2') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Pilot Planning</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm">
                        <span className="text-pink-500 mr-2">›</span>
                        <span>Select 2 BUs for career program pilot</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="text-pink-500 mr-2">›</span>
                        <span>Design workshop curriculum & materials</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Communication Strategy */}
            <Card 
              id="next-step-3"
              data-animate
              className={`glass-card border-l-4 border-purple-500 transition-all duration-700 delay-200 ${
                visibleSections.has('next-step-3') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Communication Strategy</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm">
                        <span className="text-purple-500 mr-2">›</span>
                        <span>Develop employee-facing comms plan</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="text-purple-500 mr-2">›</span>
                        <span>Create manager enablement toolkits</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Cross-BU Exchange - QUICK WIN */}
            <Card 
              id="next-step-4"
              data-animate
              className={`glass-card border-l-4 border-green-500 transition-all duration-700 delay-300 relative ${
                visibleSections.has('next-step-4') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  QUICK WIN
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Cross-BU Exchange</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm">
                        <span className="text-green-500 mr-2">›</span>
                        <span>Launch learning sessions (Low effort)</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="text-green-500 mr-2">›</span>
                        <span>Identify initial best practice champions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center border-t border-white/20 pt-8 animate-fade-in">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src="\public\myntra-logo.png" alt="Myntra" className="h-12 w-auto" />
              <span className="text-2xl font-bold">MyPulse 9.0</span>
            </div>
            <p className="text-white/90 mb-2">Strategic HR Analytics Project • 2024</p>
            <p className="text-white/80 text-sm mb-6">Empowering employees, driving engagement, building the future</p>
            
            <div className="border-t border-white/20 pt-6 mt-6">
              <p className="text-white/90 mb-2">Created by</p>
              <div className="flex items-center justify-center space-x-2">
                <p className="text-xl font-semibold">Riya A</p>
                <a 
                  href="https://www.linkedin.com/in/riya-a-6171441b2/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Linkedin size={20} />
                  <span data-href="">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
