import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { getAPiData } from '@/http/api';
import './style.css';

// Azerbaijani translations for static paths
const staticPathsMap = {
  about: 'Haqqımızda',
  news: 'Xəbərlər',
  career: 'Karyera',
  ksm: 'KSM',
  services: 'Xidmətlərimiz',
  projects: 'Layihələrimiz',
  newprojects: 'Özəl Layihələr',
  offices: 'Ofislər',
};

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dynamicTitle, setDynamicTitle] = useState(null);

  const pathnames = location.pathname
    .split('/')
    .filter((x) => x && x !== 'rrgroup');

  const lastSegment = pathnames[pathnames.length - 1];
  const secondLastSegment = pathnames[pathnames.length - 2];
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        if (!secondLastSegment || !lastSegment) return;

        let endpoint = null;
        if (secondLastSegment === 'news') {
          endpoint = `/v1/news/getBySlug/${lastSegment}`;
        } else if (secondLastSegment === 'career') {
          endpoint = `/v1/vacancy/getBySlug/${lastSegment}`;
        } else if (secondLastSegment === 'ksm') {
          endpoint = `/v1/ksm/getBySlug/${lastSegment}`;
        } else if (secondLastSegment === 'offices') {
          endpoint = `/v1/office/getBySlug/${lastSegment}`;
        }
        
        if (endpoint) {
          const data = await getAPiData(endpoint);
          setDynamicTitle(data?.title || data?.name || data?.header || null);
        }
      } catch (error) {
        console.error('Breadcrumb fetch error:', error);
      }
    };

    fetchTitle();
  }, [secondLastSegment, lastSegment]);

  const formatBreadcrumb = (str) =>
    decodeURIComponent(str)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // const getLabel = (name, index) => {
  //   if (staticPathsMap[name]) return staticPathsMap[name];

  //   // Last segment = try to use fetched title
  //   if (index === pathnames.length - 1 && dynamicTitle) return dynamicTitle;

  //   return formatBreadcrumb(name);
  // };
  const getLabel = (name, index) => {
    // Handle newprojects specifically first
    if (name === 'newprojects') return 'Özəl Layihələr';
  
    // Check all other static mappings
    if (staticPathsMap[name]) return staticPathsMap[name];
  
    // For last segment, if dynamicTitle exists, use it
    if (index === pathnames.length - 1 && dynamicTitle) return dynamicTitle;
  
    // Otherwise, format as normal
    return formatBreadcrumb(name);
  };
  

  const handleBack = () => navigate(-1);

  if (pathnames.length === 0) return null;

  return (
    <div className="container mx-auto my-10 px-4 max-w-screen-xl">
      <div className="breadcrumb-container px-4 py-2">
        <nav className="flex items-center space-x-2 text-lg text-[#0F2431] dark:text-gray-300">
          <button
            onClick={handleBack}
            className="flex items-center hover:underline"
            aria-label="Go back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {pathnames.map((name, index) => {
            const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
            const isLast = index === pathnames.length - 1;

            return (
              <div key={name} className="flex items-center space-x-1">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {isLast ? (
                  <span className="font-medium capitalize">
                    {getLabel(name, index)}
                  </span>
                ) : (
                  <Link to={routeTo} className="hover:underline capitalize">
                    {getLabel(name, index)}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
