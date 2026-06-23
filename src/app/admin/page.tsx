'use client';

import { useState } from 'react';
import { CONTENT_FILES } from '@/lib/content-files';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(CONTENT_FILES.site.brand);
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setSaveMessage('');
    } else {
      setSaveMessage('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setContent({});
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    loadContent(tab);
  };

  const loadContent = async (filename: string) => {
    try {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      const response = await fetch(`${basePath}/content/${filename}.json`);
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const handleInputChange = (
    key: string,
    value: unknown
  ) => {
    setContent({
      ...content,
      [key]: value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, you'd send this to an API endpoint
      // For now, we'll just show success message
      setSaveMessage('Content updated! (Note: Requires server-side implementation to persist)');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving content');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-800 flex items-center justify-center px-4">
        <div className="bg-dark-900 border border-gold-400/30 rounded-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-serif font-bold text-gold-400 mb-6 text-center">
            Admin Panel
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-accent font-semibold text-dark-200 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-dark-800 border border-gold-400/30 rounded-lg text-dark-50 focus:outline-none focus:border-gold-400 transition-colors"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gold-400 text-dark-900 font-accent font-bold tracking-wide uppercase rounded-lg hover:bg-gold-300 transition-all duration-300"
            >
              Login
            </button>

            {saveMessage && (
              <div className="p-3 bg-red-900/30 border border-red-400/50 rounded-lg text-red-300 text-center text-sm">
                {saveMessage}
              </div>
            )}
          </form>

          <p className="text-center text-dark-400 text-sm mt-6">
Admin password is configured via NEXT_PUBLIC_ADMIN_PASSWORD.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-800">
      {/* Header */}
      <header className="bg-dark-900 border-b border-gold-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-serif font-bold text-gold-400">
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-dark-800 border border-gold-400/30 text-dark-50 rounded-lg hover:border-gold-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Tabs */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-dark-900 border border-gold-400/30 rounded-lg p-6">
              <h3 className="text-lg font-serif font-bold text-gold-400 mb-4">
                Content Files
              </h3>
              <div className="space-y-2">
                {[
                  { id: CONTENT_FILES.site.brand, label: 'Site / Brand Config' },
                  { id: CONTENT_FILES.site.designTokens, label: 'Site / Design Tokens' },
                  { id: CONTENT_FILES.site.seoMetadata, label: 'Site / SEO Metadata' },
                  { id: CONTENT_FILES.site.mediaLibrary, label: 'Site / Media Library' },
                  { id: CONTENT_FILES.site.navigation, label: 'Site / Navigation' },
                  { id: CONTENT_FILES.pages.homeHero, label: 'Pages / Home Content' },
                  { id: CONTENT_FILES.pages.servicesCatalog, label: 'Pages / Services Catalog' },
                  { id: CONTENT_FILES.pages.aboutCompany, label: 'Pages / About Company' },
                  { id: CONTENT_FILES.pages.contactDetails, label: 'Pages / Contact Details' },
                  { id: CONTENT_FILES.operations.businessHours, label: 'Operations / Business Hours' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gold-400 text-dark-900 font-semibold'
                        : 'text-dark-200 hover:bg-dark-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <p className="text-sm text-dark-400 mt-8 pt-6 border-t border-gold-400/20">
                Note: This is a demo interface. For full functionality, integrate with a backend API.
              </p>
            </div>
          </div>

          {/* Editor */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-dark-900 border border-gold-400/30 rounded-lg p-8">
              <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6">
                Editing: {activeTab}
              </h2>

              <div className="space-y-6 max-h-96 overflow-y-auto">
                {Object.entries(content).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-accent font-semibold text-dark-200 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>

                    {typeof value === 'string' ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full px-4 py-2 bg-dark-800 border border-gold-400/30 rounded-lg text-dark-50 focus:outline-none focus:border-gold-400 transition-colors"
                      />
                    ) : typeof value === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleInputChange(key, e.target.checked)}
                        className="w-4 h-4"
                      />
                    ) : (
                      <textarea
                        value={JSON.stringify(value, null, 2)}
                        onChange={(e) => {
                          try {
                            handleInputChange(key, JSON.parse(e.target.value));
                          } catch {
                            // Let user fix JSON syntax
                          }
                        }}
                        className="w-full px-4 py-2 bg-dark-800 border border-gold-400/30 rounded-lg text-dark-50 focus:outline-none focus:border-gold-400 transition-colors font-mono text-sm resize-vertical"
                        rows={4}
                      />
                    )}
                  </div>
                ))}
              </div>

              {saveMessage && (
                <div className={`mt-6 p-4 border rounded-lg text-center ${
                  saveMessage.includes('Error')
                    ? 'bg-red-900/30 border-red-400/50 text-red-300'
                    : 'bg-green-900/30 border-green-400/50 text-green-300'
                }`}>
                  {saveMessage}
                </div>
              )}

              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 px-6 py-3 bg-gold-400 text-dark-900 font-accent font-bold tracking-wide uppercase rounded-lg hover:bg-gold-300 transition-all duration-300 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => handleTabChange(activeTab)}
                  className="flex-1 px-6 py-3 bg-dark-800 text-dark-50 font-accent font-bold tracking-wide uppercase rounded-lg border border-gold-400/30 hover:border-gold-400 transition-colors"
                >
                  Reload
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
