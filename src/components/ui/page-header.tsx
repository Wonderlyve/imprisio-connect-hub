
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  backLink?: string;
  className?: string;
  subtitle?: string;
  action?: React.ReactNode;
  noBackOnHome?: boolean;
}

const PageHeader = ({ 
  title, 
  backLink = "/", 
  className, 
  subtitle,
  action,
  noBackOnHome = true 
}: PageHeaderProps) => {
  // Don't show back button on home page if noBackOnHome is true
  const isHomePage = window.location.pathname === '/';
  const showBackButton = !(noBackOnHome && isHomePage);
  
  return (
    <div className={cn("mb-6 flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <Link to={backLink} className="mr-4">
              <Button variant="ghost" size="sm" className="p-1">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        </div>
        
        {action && (
          <div>
            {action}
          </div>
        )}
      </div>
      
      {subtitle && (
        <p className="text-gray-600 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default PageHeader;
