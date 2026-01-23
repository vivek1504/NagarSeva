import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Issue } from '@/types';
import { getStatusColor, getIssueTypeLabel } from '@/lib/issueUtils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface IssueMapViewProps {
  issues: Issue[];
  selectedIssue: Issue | null;
  onMarkerClick: (issue: Issue) => void;
}

// Custom marker icons based on NagarSeva issue status
const createMarkerIcon = (status: string) => {
  const colors: Record<string, string> = {
    DETECTED: '#ef4444',
    ASSIGNED: '#64748b',
    IN_PROGRESS: '#60a5fa',
    FIXED: '#38bdf8',
    RESOLVED: '#22c55e',
    REJECTED: '#f97316',
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 24px;
      height: 24px;
      background-color: ${colors[status] || '#64748b'};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Component to handle map centering
const MapCenterHandler = ({ selectedIssue }: { selectedIssue: Issue | null }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedIssue) {
      map.flyTo([selectedIssue.latitude, selectedIssue.longitude], 15);
    }
  }, [selectedIssue, map]);

  return null;
};

export const IssueMapView = ({ issues, selectedIssue, onMarkerClick }: IssueMapViewProps) => {
  // Center on Vadodara
  const defaultCenter: [number, number] = [22.3072, 73.1812];
  const defaultZoom = 13;

  return (
    <Card className="overflow-hidden h-[500px]">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterHandler selectedIssue={selectedIssue} />

        {issues.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.latitude, issue.longitude]}
            icon={createMarkerIcon(issue.status)}
            eventHandlers={{
              click: () => onMarkerClick(issue),
            }}
          >
            <Popup>
              <div className="p-1">
                <div className="font-medium">{getIssueTypeLabel(issue.type)}</div>
                <div className="text-sm text-muted-foreground">{issue.wardName}</div>
                <div className="text-xs mt-1">Status: {issue.status}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Card>
  );
};
