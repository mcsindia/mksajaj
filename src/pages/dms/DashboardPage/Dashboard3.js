import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../../layouts/dms/AdminLayout/AdminLayout';
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { Bar, Pie, Line } from "react-chartjs-2";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet.heat";
import { Link } from 'react-router-dom';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    Filler,
    ArcElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    Filler,
    ArcElement
);

export const Dashboard3 = () => {
    const [filter, setFilter] = useState("This Year");

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
        console.log(`Filter changed to: ${selectedFilter}`);
    };

    const stats = [
        {
            category: "Ride Statistics",
            icon: "🚖", // Taxi icon representing rides
            status: "✅", // Green (Good Condition)
            link: '/riders',
            items: [
                { title: "Total Rides", value: "550" },
                { title: "Active Rides", value: "11" },
                { title: "Completed Rides", value: "22" },
                { title: "Canceled Rides", value: "22" },
                { title: "Pending Ride Requests", value: "10" }
            ],
            color: "#500073"
        },
        {
            category: "Driver Performance",
            icon: "👨‍✈️", // Driver icon
            status: "⚠", // Yellow (Moderate Issues)
            link: '/drivers',
            items: [
                { title: "Total Drivers", value: "100" },
                { title: "Active Drivers", value: "45" },
                { title: "Idle Drivers", value: "30" },
                { title: "Driver Approval Pending", value: "15" },
                { title: "Driver Suspended", value: "10" }
            ],
            color: "#118B50"
        },
        {
            category: "Rider Engagement",
            icon: "🧑‍🤝‍🧑", // People icon representing riders
            status: "✅", // Green (Good)
            link: '/riders',
            items: [
                { title: "Total Riders", value: "2000" },
                { title: "Active Riders", value: "450" },
                { title: "New Sign-ups", value: "50" },
                { title: "Top Rated Riders", value: "100" }
            ],
            color: "#006BFF"
        },
        {
            category: "Payment Overview",
            icon: "💰", // Money bag icon
            status: "❌", // Red (Critical Issues)
            link: '/payment',
            items: [
                { title: "Total Revenue", value: "₹50000" },
                { title: "Pending Payments", value: "₹5000" },
                { title: "Driver Payouts Pending", value: "₹7000" },
                { title: "Refund Requests", value: "₹2000" }
            ],
            color: "#F72C5B"
        },
        {
            category: "Support & Complaints",
            icon: "📞", // Support call icon
            status: "⚠", // Yellow (Needs Attention)
            link: "/support-request",
            items: [
                { title: "Total Support Tickets", value: "50" },
                { title: "Pending Complaints", value: "20" },
                { title: "Resolved Complaints", value: "25" },
                { title: "Refund Requests Pending", value: "5" }
            ],
            color: "#ff9800"
        }
    ];


    const revenueData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Revenue (₹)",
                data: [42000, 25000, 35000, 40000, 50000, 35000, 47000, 43000, 30000, 48000, 35000, 50000],
                backgroundColor: (context) => (context.raw > 40000 ? "#007bff" : "#6c757d"),
                borderRadius: 6,
            },
        ],
    };

    const revenueOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `₹${context.raw.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { weight: "bold" } } },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `₹${value / 1000}k`,
                    font: { weight: "bold" },
                },
                grid: { drawBorder: false },
            },
        },
        animation: { duration: 1000, easing: "easeInOutQuart" },
    };

    const driverAvailabilityData = {
        labels: ["Active", "Idle", "Suspended"],
        datasets: [
            {
                data: [45, 30, 10],
                backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: { position: "bottom", labels: { boxWidth: 15 } },
            tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } },
        },
        maintainAspectRatio: false,
    };

    const rideVolumeData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Completed Rides",
                data: [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750],
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                pointBackgroundColor: "#FF4D4D",
                pointRadius: 4,
            },
        ],
    };

    const rideOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (context) => `Rides: ${context.raw}` } },
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { weight: "bold" } } },
            y: { beginAtZero: true, ticks: { font: { weight: "bold" } } },
        },
        elements: { line: { tension: 0.3 } },
    };

    // User engagement heatmap points
    const heatmapData = [
        [28.7041, 77.1025, 0.8], // Delhi
        [19.0760, 72.8777, 0.7], // Mumbai
        [12.9716, 77.5946, 0.9], // Bangalore
        [13.0827, 80.2707, 0.6], // Chennai
        [22.5726, 88.3639, 0.5], // Kolkata
        [26.9124, 75.7873, 0.4], // Jaipur
        [17.3850, 78.4867, 0.8], // Hyderabad
    ];

    // Custom Heatmap Layer Component
    const HeatmapLayer = () => {
        const map = useMap();

        useEffect(() => {
            if (!map) return;

            // Add Heatmap Layer
            const heatLayer = L.heatLayer(heatmapData, {
                radius: 25,
                blur: 20,
                maxZoom: 10,
                max: 1.0,
                gradient: {
                    0.2: "#00008B",  // Dark Blue - Low
                    0.4: "#4B0082",  // Indigo - Moderate
                    0.6: "#8B0000",  // Dark Red - High
                    0.8: "#B22222",  // Firebrick - Very High
                    1.0: "#FF4500"   // Orange Red - Peak
                }
            }).addTo(map);

            // Add Engagement Level Markers
            heatmapData.forEach(([lat, lng, intensity]) => {
                const engagementLabel = intensity > 0.7 ? "High" :
                    intensity > 0.5 ? "Medium" :
                        "Low";

                L.circleMarker([lat, lng], {
                    radius: 10,
                    color: "#fff",
                    fillColor: "#000",
                    fillOpacity: 0.8,
                    weight: 1
                })
                    .bindTooltip(`Engagement: ${engagementLabel}`, { permanent: true, direction: "top", className: "engagement-tooltip" })
                    .addTo(map);
            });

            return () => {
                map.removeLayer(heatLayer);
            };
        }, [map]);

        return null;
    };

    return (
        <AdminLayout>
            <div className="dashboard-container container-fluid">
                <div className="dms-pages-header d-flex justify-content-between align-items-center mb-4">
                    <h2>Dashboard</h2>
                    <DropdownButton
                        id="dropdown-filter"
                        title={<><FaCalendarAlt /> {filter}</>}
                        onSelect={handleFilterChange}
                    >
                        <Dropdown.Item eventKey="This Week">This Week</Dropdown.Item>
                        <Dropdown.Item eventKey="This Month">This Month</Dropdown.Item>
                        <Dropdown.Item eventKey="This Year">This Year</Dropdown.Item>
                    </DropdownButton>
                </div>

                <div className="row">
                    {/* Left Section */}
                    <div className="col-lg-7 dms-left-section">
                        <div className="row">
                            {stats.map((stat, index) => (
                                <div className="col-md-6 mb-4" key={index}>
                                    <div className="card p-shadow-sm">
                                        <h4
                                            className="card-header d-flex align-items-center justify-content-between mb-2"
                                            style={{
                                                color: 'white',
                                                backgroundColor: stat.color,
                                                padding: '10px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            <span>
                                                {stat.icon}
                                                <Link
                                                    to={stat.link}
                                                    style={{ color: 'white', textDecoration: 'none' }}
                                                >
                                                    {stat.category}
                                                </Link>
                                            </span>
                                            <span style={{ fontSize: '1.2rem' }}>{stat.status}</span>
                                        </h4>

                                        {/* Card Body */}
                                        <div className="p-2">
                                            {stat.items.map((item, idx) => (
                                                <div className="stat-item d-flex justify-content-between" key={idx}>
                                                    <p className="stat-title mb-1">{item.title}</p>
                                                    <p className="stat-value mb-1 font-weight-bold">{item.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="col-lg-5 dms-right-section">
                        {/* Revenue Growth Chart */}

                        <h5 className=" mb-2">Revenue Growth (₹)</h5>
                        <div className="card p-4 shadow-sm mb-4">
                            <div style={{ height: "250px", width: "100%" }}>
                                <Bar data={revenueData} options={revenueOptions} />
                            </div>
                        </div>
                        {/* Driver Availability Pie Chart */}
                        <h5 className=" mb-2">Driver Availability</h5>
                        <div className="card p-4 shadow-sm mb-4">
                            <div style={{ height: "250px", width: "100%" }}>
                                <Pie data={driverAvailabilityData} options={pieOptions} />
                            </div>
                        </div>

                        {/* Ride Volume Line Graph */}
                        <h5 className=" mb-2">Ride Volume Over Time</h5>
                        <div className="card p-4 shadow-sm mb-4">
                            <div style={{ height: "250px", width: "100%" }}>
                                <Line data={rideVolumeData} options={rideOptions} />
                            </div>
                        </div>

                        {/* User Engagement Heatmap */}
                        <h5 className=" mb-2">User Engagement (Heatmap by Region)</h5>
                        <div className="card p-4 shadow-sm mb-4">
                            <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "250px", width: "100%" }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <HeatmapLayer />
                            </MapContainer>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
