#!/usr/bin/env python3
"""
WsCharge API Client for Power Bank Station Communication
This client implements the WsCharge protocol to communicate with actual power bank stations
"""

import requests
import json
import time
from typing import Dict, Any, Optional, List
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WsChargeAPIClient:
    def __init__(self, base_url: str = "http://localhost:8000", token: str = "qMuV&x7nP4EUPR!ERvc9K^syP&m!V5"):
        self.base_url = base_url
        self.token = token
        self.station_id = "WSHP161752119500"
        self.headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        
    def _make_request(self, endpoint: str, method: str = "GET", data: Optional[Dict] = None) -> Dict[str, Any]:
        """Make HTTP request to WsCharge API"""
        url = f"{self.base_url}/api/v1/station-comm{endpoint}"
        
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=self.headers, timeout=10)
            elif method.upper() == "POST":
                response = requests.post(url, headers=self.headers, json=data, timeout=10)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")
            
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"API request failed: {e}")
            return {"success": False, "error": str(e)}
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse JSON response: {e}")
            return {"success": False, "error": "Invalid JSON response"}
    
    def get_station_inventory(self, station_id: str = None) -> Dict[str, Any]:
        """Get current inventory status of a station"""
        station_id = station_id or self.station_id
        endpoint = f"/inventory/{station_id}"
        return self._make_request(endpoint)
    
    def send_station_command(self, function_code: int, slot_number: Optional[int] = None, 
                           power_bank_id: Optional[str] = None) -> Dict[str, Any]:
        """Send a command to the station"""
        endpoint = "/command"
        data = {
            "functionCode": function_code,
            "stationId": self.station_id,
            "slotNumber": slot_number,
            "powerBankId": power_bank_id
        }
        return self._make_request(endpoint, method="POST", data=data)
    
    def query_inventory(self) -> Dict[str, Any]:
        """Query station inventory (Function Code 64)"""
        return self.send_station_command(64)
    
    def initiate_borrow(self, slot_number: int) -> Dict[str, Any]:
        """Initiate power bank borrowing (Function Code 65)"""
        return self.send_station_command(65, slot_number=slot_number)
    
    def initiate_return(self, power_bank_id: str, slot_number: int) -> Dict[str, Any]:
        """Initiate power bank return (Function Code 66)"""
        return self.send_station_command(66, slot_number=slot_number, power_bank_id=power_bank_id)
    
    def force_eject(self, slot_number: int) -> Dict[str, Any]:
        """Force eject power bank (Function Code 80)"""
        return self.send_station_command(80, slot_number=slot_number)
    
    def full_bounce(self) -> Dict[str, Any]:
        """Full bounce command (Function Code 81)"""
        return self.send_station_command(81)
    
    def restart_station(self) -> Dict[str, Any]:
        """Restart station (Function Code 67)"""
        return self.send_station_command(67)
    
    def get_station_status(self) -> Dict[str, Any]:
        """Get current station status and health"""
        # This would typically query the actual station hardware
        # For now, we'll simulate based on the last known state
        return {
            "success": True,
            "data": {
                "stationId": self.station_id,
                "status": "ONLINE",
                "lastHeartbeat": datetime.now().isoformat(),
                "totalSlots": 8,
                "availableSlots": 6,
                "availableBanks": 4,
                "powerBanks": [
                    {
                        "powerBankId": "PB001",
                        "serialNumber": "PB001",
                        "batteryLevel": 85,
                        "status": "AVAILABLE",
                        "slotNumber": 1,
                        "healthScore": 90
                    },
                    {
                        "powerBankId": "PB002", 
                        "serialNumber": "PB002",
                        "batteryLevel": 92,
                        "status": "AVAILABLE",
                        "slotNumber": 2,
                        "healthScore": 88
                    }
                ]
            }
        }

# Example usage and testing
if __name__ == "__main__":
    client = WsChargeAPIClient()
    
    print("=== WsCharge API Client Test ===")
    
    # Test station status
    print("\n1. Getting station status...")
    status = client.get_station_status()
    print(f"Status: {json.dumps(status, indent=2)}")
    
    # Test inventory query
    print("\n2. Querying inventory...")
    inventory = client.get_station_inventory()
    print(f"Inventory: {json.dumps(inventory, indent=2)}")
    
    # Test command sending
    print("\n3. Sending query inventory command...")
    command = client.query_inventory()
    print(f"Command result: {json.dumps(command, indent=2)}")
