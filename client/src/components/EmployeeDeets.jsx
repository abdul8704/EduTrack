import React, { useRef } from 'react';
import '../styles/empdeets.css'; // reuse for layout/styling if applicable
import { ProfileCard } from './ProfileCard'; // ✅ Import reusable profile card component

export const EmployeeDeets = () => {
  const users = [
    {
      id: 1,
      name: 'Keerthika',
      designation: 'Software Developer',
      email: 'keerthika@example.com',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'Arjun Kumar',
      designation: 'Data Scientist',
      email: 'arjun@example.com',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'Nandhini R',
      designation: 'UI/UX Designer',
      email: 'nandhini@example.com',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      id: 4,
      name: 'Vikram Das',
      designation: 'DevOps Engineer',
      email: 'vikram@example.com',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
      id: 5,
      name: 'Priya B',
      designation: 'Project Manager',
      email: 'priya@example.com',
      photo: 'https://randomuser.me/api/portraits/women/15.jpg',
    },
    {
      id: 6,
      name: 'Vikram Das',
      designation: 'DevOps Engineer',
      email: 'vikram@example.com',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
      id: 7,
      name: 'Priya B',
      designation: 'Project Manager',
      email: 'priya@example.com',
      photo: 'https://randomuser.me/api/portraits/women/15.jpg',
    },
    {
      id: 8,
      name: 'Priya B',
      designation: 'Project Manager',
      email: 'priya@example.com',
      photo: 'https://randomuser.me/api/portraits/women/15.jpg',
    }
  ];

  const scrollRef = useRef(null);

  return (
    <div className="enrolled-container">
      <div className="enrolled-title"></div>
      <div className="available-courses-container" ref={scrollRef}>
        {users.map((user) => (
          <ProfileCard
            key={user.id}
            photo={user.photo}
            name={user.name}
            designation={user.designation}
            email={user.email}
          />
        ))}

      </div>
    </div>
  );
};
