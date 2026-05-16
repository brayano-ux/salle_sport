import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      navigate('/')
    }
  }, [isLoading, isAuthenticated, user, navigate])

  const { data: subscriptions, isLoading: subsLoading } = trpc.subscription.list.useQuery(
    undefined,
    { enabled: user?.role === 'admin' }
  )

  const { data: messages, isLoading: msgsLoading } = trpc.contact.list.useQuery(
    undefined,
    { enabled: user?.role === 'admin' }
  )

  const utils = trpc.useUtils()

  const updateStatus = trpc.subscription.updateStatus.useMutation({
    onSuccess: () => utils.subscription.list.invalidate(),
  })

  const markAsRead = trpc.contact.markAsRead.useMutation({
    onSuccess: () => utils.contact.list.invalidate(),
  })

  if (isLoading) {
    return (
      <div style={{ padding: '120px 40px', textAlign: 'center', fontSize: '15px', color: '#666' }}>
        Chargement...
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }

  const unreadCount = messages?.filter((m) => m.isRead === 'unread').length || 0

  return (
    <div style={{ padding: '120px 40px 60px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            marginBottom: '8px',
          }}
        >
          Tableau de bord
        </h1>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Gérez vos abonnements et messages
        </p>
      </div>

      {/* Stats cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        <StatCard label="Abonnements" value={subscriptions?.length || 0} />
        <StatCard label="Messages" value={messages?.length || 0} />
        <StatCard label="Non lus" value={unreadCount} highlight />
        <StatCard
          label="Actifs"
          value={subscriptions?.filter((s) => s.status === 'active').length || 0}
        />
      </div>

      {/* Subscriptions table */}
      <div style={{ marginBottom: '60px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          Abonnements
        </h2>
        {subsLoading ? (
          <p style={{ color: '#666' }}>Chargement...</p>
        ) : !subscriptions?.length ? (
          <p style={{ color: '#666' }}>Aucun abonnement pour le moment.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #000' }}>
                  <Th>ID</Th>
                  <Th>Nom</Th>
                  <Th>Email</Th>
                  <Th>Téléphone</Th>
                  <Th>Forfait</Th>
                  <Th>Statut</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <Td>#{sub.id}</Td>
                    <Td>{sub.fullName}</Td>
                    <Td>{sub.email}</Td>
                    <Td>{sub.phone || '-'}</Td>
                    <Td>
                      <span
                        style={{
                          padding: '4px 10px',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          border: '1px solid #000',
                        }}
                      >
                        {sub.planType}
                      </span>
                    </Td>
                    <Td>
                      <StatusBadge status={sub.status} />
                    </Td>
                    <Td>{new Date(sub.createdAt).toLocaleDateString('fr-FR')}</Td>
                    <Td>
                      <select
                        value={sub.status}
                        onChange={(e) =>
                          updateStatus.mutate({
                            id: sub.id,
                            status: e.target.value as 'pending' | 'active' | 'cancelled',
                          })
                        }
                        style={{
                          padding: '6px 10px',
                          fontSize: '12px',
                          border: '1px solid #ccc',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        <option value="pending">En attente</option>
                        <option value="active">Actif</option>
                        <option value="cancelled">Annulé</option>
                      </select>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Messages table */}
      <div>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          Messages de contact
        </h2>
        {msgsLoading ? (
          <p style={{ color: '#666' }}>Chargement...</p>
        ) : !messages?.length ? (
          <p style={{ color: '#666' }}>Aucun message pour le moment.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #000' }}>
                  <Th>ID</Th>
                  <Th>Nom</Th>
                  <Th>Email</Th>
                  <Th>Sujet</Th>
                  <Th>Message</Th>
                  <Th>Statut</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    style={{
                      borderBottom: '1px solid #e5e5e5',
                      backgroundColor: msg.isRead === 'unread' ? '#f8f8f8' : 'transparent',
                    }}
                  >
                    <Td>#{msg.id}</Td>
                    <Td>{msg.fullName}</Td>
                    <Td>{msg.email}</Td>
                    <Td>{msg.subject || '-'}</Td>
                    <Td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {msg.message}
                    </Td>
                    <Td>
                      <ReadBadge isRead={msg.isRead === 'read'} />
                    </Td>
                    <Td>{new Date(msg.createdAt).toLocaleDateString('fr-FR')}</Td>
                    <Td>
                      {msg.isRead === 'unread' && (
                        <button
                          onClick={() => markAsRead.mutate({ id: msg.id })}
                          style={{
                            padding: '6px 12px',
                            fontSize: '11px',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            border: '1px solid #000',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                          }}
                        >
                          Marquer lu
                        </button>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string
  value: number
  highlight?: boolean
}) {
  return (
    <div
      style={{
        padding: '24px',
        border: highlight ? '2px solid #000' : '1px solid #e5e5e5',
        backgroundColor: highlight ? '#000' : '#fff',
      }}
    >
      <p
        style={{
          fontSize: '32px',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          color: highlight ? '#fff' : '#000',
          marginBottom: '4px',
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: highlight ? 'rgba(255,255,255,0.7)' : '#666',
        }}
      >
        {label}
      </p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    pending: { bg: '#f5f5dc', color: '#8b7355' },
    active: { bg: '#e8f5e9', color: '#2e7d32' },
    cancelled: { bg: '#ffebee', color: '#c62828' },
  }
  const c = colors[status] || colors.pending
  const labels: Record<string, string> = {
    pending: 'En attente',
    active: 'Actif',
    cancelled: 'Annulé',
  }
  return (
    <span
      style={{
        padding: '4px 10px',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        backgroundColor: c.bg,
        color: c.color,
      }}
    >
      {labels[status] || status}
    </span>
  )
}

function ReadBadge({ isRead }: { isRead: boolean }) {
  return (
    <span
      style={{
        padding: '4px 10px',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        backgroundColor: isRead ? '#e8f5e9' : '#f5f5dc',
        color: isRead ? '#2e7d32' : '#8b7355',
      }}
    >
      {isRead ? 'Lu' : 'Non lu'}
    </span>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        padding: '12px 16px',
        textAlign: 'left',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#666',
      }}
    >
      {children}
    </th>
  )
}

function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td
      style={{
        padding: '12px 16px',
        fontSize: '14px',
        color: '#000',
        ...style,
      }}
    >
      {children}
    </td>
  )
}
