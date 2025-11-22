import { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import DocumentCard from './components/DocumentCard';
import WorkspacePanel from './components/WorkspacePanel';
import TeamMemberList from './components/TeamMemberList';
import ActivityFeed from './components/ActivityFeed';
import CommentThread from './components/CommentThread';
import ShareModal from './components/ShareModal';
import { Document, Workspace, TeamMember, Activity, Comment, ShareSettings } from './types';

const TeamCollaborationHub = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState('ws1');
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareDocumentId, setShareDocumentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const mockTeamMembers: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14f7047a7-1763297773032.png",
    role: 'owner',
    status: 'online',
    lastActive: new Date()
  },
  {
    id: 'tm2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    avatar: "https://images.unsplash.com/photo-1663991716563-5a18e223d317",
    role: 'editor',
    status: 'online',
    lastActive: new Date()
  },
  {
    id: 'tm3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_140bc34c6-1763294993377.png",
    role: 'editor',
    status: 'away',
    lastActive: new Date(Date.now() - 1800000)
  },
  {
    id: 'tm4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    role: 'viewer',
    status: 'offline',
    lastActive: new Date(Date.now() - 7200000)
  }];


  const mockComments: Comment[] = [
  {
    id: 'c1',
    userId: 'tm2',
    userName: 'Michael Chen',
    userAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    content: 'The readability score looks great! I think we should focus on simplifying the technical jargon in section 3.',
    timestamp: new Date(Date.now() - 3600000),
    mentions: [],
    replies: [
    {
      id: 'c1r1',
      userId: 'tm1',
      userName: 'Sarah Johnson',
      userAvatar: "https://images.unsplash.com/photo-1690537371861-8f047b7eaa21",
      content: 'Good point! I\'ll work on that section today.',
      timestamp: new Date(Date.now() - 1800000),
      mentions: ['tm2'],
      replies: [],
      isEdited: false
    }],

    isEdited: false
  },
  {
    id: 'c2',
    userId: 'tm3',
    userName: 'Emily Rodriguez',
    userAvatar: "https://images.unsplash.com/photo-1514875379895-44e7ad14453a",
    content: '@Sarah Johnson Can you review the changes I made to the introduction? I think it flows better now.',
    timestamp: new Date(Date.now() - 7200000),
    mentions: ['tm1'],
    replies: [],
    isEdited: true
  }];


  const mockDocuments: Document[] = [
  {
    id: 'doc1',
    title: 'Q4 Marketing Strategy Document',
    description: 'Comprehensive marketing plan for the fourth quarter including campaign strategies, budget allocation, and performance metrics.',
    owner: mockTeamMembers[0],
    collaborators: [mockTeamMembers[0], mockTeamMembers[1], mockTeamMembers[2]],
    lastModified: new Date(Date.now() - 3600000),
    status: 'active',
    readabilityScore: 78,
    wordCount: 4250,
    comments: mockComments,
    isPublic: true,
    publicLink: 'https://textanalyzer.pro/share/abc123',
    thumbnail: "https://images.unsplash.com/photo-1542744094-f77e9f7a10b8",
    thumbnailAlt: 'Marketing strategy document with colorful charts and graphs on laptop screen'
  },
  {
    id: 'doc2',
    title: 'Product Requirements Specification',
    description: 'Detailed technical specifications and user requirements for the new product launch scheduled for next quarter.',
    owner: mockTeamMembers[1],
    collaborators: [mockTeamMembers[1], mockTeamMembers[2], mockTeamMembers[3]],
    lastModified: new Date(Date.now() - 7200000),
    status: 'active',
    readabilityScore: 65,
    wordCount: 6800,
    comments: [],
    isPublic: false,
    thumbnail: "https://images.unsplash.com/photo-1673630810531-f63f6d7a27cd",
    thumbnailAlt: 'Product specification document with technical diagrams and flowcharts'
  },
  {
    id: 'doc3',
    title: 'Annual Report Draft 2024',
    description: 'Company annual report draft including financial statements, operational highlights, and future outlook for stakeholders.',
    owner: mockTeamMembers[0],
    collaborators: [mockTeamMembers[0], mockTeamMembers[1]],
    lastModified: new Date(Date.now() - 86400000),
    status: 'draft',
    readabilityScore: 82,
    wordCount: 12500,
    comments: [],
    isPublic: false,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1511652b0-1763783513226.png",
    thumbnailAlt: 'Annual report document with financial charts and business analytics'
  },
  {
    id: 'doc4',
    title: 'Employee Handbook Update',
    description: 'Updated employee handbook with revised policies, benefits information, and company culture guidelines.',
    owner: mockTeamMembers[2],
    collaborators: [mockTeamMembers[2], mockTeamMembers[3]],
    lastModified: new Date(Date.now() - 172800000),
    status: 'archived',
    readabilityScore: 88,
    wordCount: 8900,
    comments: [],
    isPublic: false,
    thumbnail: "https://images.unsplash.com/photo-1497382147034-7cfc8a226f55",
    thumbnailAlt: 'Employee handbook document with company policies and guidelines'
  }];


  const mockWorkspaces: Workspace[] = [
  {
    id: 'ws1',
    name: 'Marketing Team',
    description: 'Marketing campaigns and content strategy',
    documents: mockDocuments.filter((d) => ['doc1', 'doc3'].includes(d.id)),
    members: mockTeamMembers.slice(0, 3),
    createdAt: new Date(Date.now() - 2592000000),
    icon: 'Megaphone'
  },
  {
    id: 'ws2',
    name: 'Product Development',
    description: 'Product specs and technical documentation',
    documents: mockDocuments.filter((d) => d.id === 'doc2'),
    members: mockTeamMembers.slice(1, 4),
    createdAt: new Date(Date.now() - 5184000000),
    icon: 'Package'
  },
  {
    id: 'ws3',
    name: 'HR & Operations',
    description: 'HR policies and operational procedures',
    documents: mockDocuments.filter((d) => d.id === 'doc4'),
    members: [mockTeamMembers[2], mockTeamMembers[3]],
    createdAt: new Date(Date.now() - 7776000000),
    icon: 'Users'
  }];


  const mockActivities: Activity[] = [
  {
    id: 'act1',
    type: 'comment',
    user: mockTeamMembers[1],
    document: { id: 'doc1', title: 'Q4 Marketing Strategy Document' },
    message: 'commented on',
    timestamp: new Date(Date.now() - 3600000),
    isRead: false
  },
  {
    id: 'act2',
    type: 'edit',
    user: mockTeamMembers[2],
    document: { id: 'doc2', title: 'Product Requirements Specification' },
    message: 'edited',
    timestamp: new Date(Date.now() - 7200000),
    isRead: false
  },
  {
    id: 'act3',
    type: 'mention',
    user: mockTeamMembers[2],
    document: { id: 'doc1', title: 'Q4 Marketing Strategy Document' },
    message: 'mentioned you in',
    timestamp: new Date(Date.now() - 10800000),
    isRead: false
  },
  {
    id: 'act4',
    type: 'share',
    user: mockTeamMembers[0],
    document: { id: 'doc1', title: 'Q4 Marketing Strategy Document' },
    message: 'shared',
    timestamp: new Date(Date.now() - 86400000),
    isRead: true
  },
  {
    id: 'act5',
    type: 'permission',
    user: mockTeamMembers[0],
    document: { id: 'doc2', title: 'Product Requirements Specification' },
    message: 'changed permissions for',
    timestamp: new Date(Date.now() - 172800000),
    isRead: true
  }];


  const activeWorkspace = mockWorkspaces.find((w) => w.id === activeWorkspaceId);
  const displayDocuments = activeWorkspace?.documents || [];

  const filteredDocuments = displayDocuments.filter((doc) => {
    const matchesSearch =
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.lastModified.getTime() - a.lastModified.getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'readability':
        return b.readabilityScore - a.readabilityScore;
      default:
        return 0;
    }
  });

  const handleShareDocument = (documentId: string) => {
    setShareDocumentId(documentId);
    setIsShareModalOpen(true);
  };

  const handleCommentDocument = (documentId: string) => {
    setSelectedDocumentId(documentId);
  };

  const handleSaveShareSettings = (settings: ShareSettings) => {
    console.log('Share settings saved:', settings);
  };

  const handleAddComment = (content: string, parentId?: string) => {
    console.log('Adding comment:', content, parentId);
  };

  const handleEditComment = (commentId: string, content: string) => {
    console.log('Editing comment:', commentId, content);
  };

  const handleDeleteComment = (commentId: string) => {
    console.log('Deleting comment:', commentId);
  };

  const handleMarkActivityAsRead = (activityId: string) => {
    console.log('Marking activity as read:', activityId);
  };

  const handleMarkAllActivitiesAsRead = () => {
    console.log('Marking all activities as read');
  };

  const handleInviteMember = () => {
    console.log('Inviting team member');
  };

  const handleRemoveMember = (memberId: string) => {
    console.log('Removing member:', memberId);
  };

  const handleChangeRole = (memberId: string, role: 'owner' | 'editor' | 'viewer') => {
    console.log('Changing role:', memberId, role);
  };

  const handleCreateWorkspace = () => {
    console.log('Creating new workspace');
  };

  const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' }];


  const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'title', label: 'Title (A-Z)' },
  { value: 'readability', label: 'Readability Score' }];


  const selectedDocument = mockDocuments.find((d) => d.id === selectedDocumentId);
  const shareDocument = mockDocuments.find((d) => d.id === shareDocumentId);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

      <main className="lg:ml-60 pt-16">
        <div className="p-6 max-w-[1600px] mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">Team Collaboration Hub</h1>
              <Button variant="default" iconName="Plus" iconPosition="left" iconSize={20}>
                New Document
              </Button>
            </div>
            <p className="text-muted-foreground">
              Collaborate with your team on text analysis projects in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-1 space-y-6">
              <WorkspacePanel
                workspaces={mockWorkspaces}
                activeWorkspaceId={activeWorkspaceId}
                onWorkspaceChange={setActiveWorkspaceId}
                onCreateWorkspace={handleCreateWorkspace} />


              <TeamMemberList
                members={activeWorkspace?.members || []}
                onInviteMember={handleInviteMember}
                onRemoveMember={handleRemoveMember}
                onChangeRole={handleChangeRole} />


              <ActivityFeed
                activities={mockActivities}
                onMarkAsRead={handleMarkActivityAsRead}
                onMarkAllAsRead={handleMarkAllActivitiesAsRead} />

            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      type="search"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full" />

                  </div>
                  <div className="flex gap-2">
                    <Select
                      options={statusOptions}
                      value={filterStatus}
                      onChange={setFilterStatus}
                      className="w-40" />

                    <Select
                      options={sortOptions}
                      value={sortBy}
                      onChange={setSortBy}
                      className="w-40" />

                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {activeWorkspace?.name} Documents
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {sortedDocuments.length} document{sortedDocuments.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {sortedDocuments.length > 0 ?
                <div className="space-y-4">
                    {sortedDocuments.map((document) =>
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onShare={handleShareDocument}
                    onComment={handleCommentDocument} />

                  )}
                  </div> :

                <div className="text-center py-12">
                    <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {searchQuery ?
                    'Try adjusting your search or filters' : 'Create your first document to get started'}
                    </p>
                    <Button variant="default" iconName="Plus" iconPosition="left">
                      Create Document
                    </Button>
                  </div>
                }
              </div>

              {selectedDocument &&
              <CommentThread
                comments={selectedDocument.comments}
                onAddComment={handleAddComment}
                onEditComment={handleEditComment}
                onDeleteComment={handleDeleteComment} />

              }
            </div>
          </div>
        </div>
      </main>

      {shareDocument &&
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setShareDocumentId(null);
        }}
        documentTitle={shareDocument.title}
        currentSettings={{
          isPublic: shareDocument.isPublic,
          allowComments: true,
          allowDownload: true,
          permissions: []
        }}
        onSave={handleSaveShareSettings} />

      }
    </div>);

};

export default TeamCollaborationHub;