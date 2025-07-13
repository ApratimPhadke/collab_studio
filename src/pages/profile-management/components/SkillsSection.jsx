import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SkillsSection = ({ skills, onSkillsUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 3, category: 'technical' });
  const [editedSkills, setEditedSkills] = useState(skills);

  const skillCategories = {
    technical: 'Technical Skills',
    soft: 'Soft Skills',
    tools: 'Tools & Frameworks'
  };

  const proficiencyLevels = {
    1: { label: 'Beginner', color: 'bg-red-100 text-red-800' },
    2: { label: 'Novice', color: 'bg-orange-100 text-orange-800' },
    3: { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
    4: { label: 'Advanced', color: 'bg-blue-100 text-blue-800' },
    5: { label: 'Expert', color: 'bg-green-100 text-green-800' }
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      const skill = {
        id: Date.now(),
        ...newSkill,
        endorsements: 0,
        verified: false
      };
      setEditedSkills(prev => [...prev, skill]);
      setNewSkill({ name: '', level: 3, category: 'technical' });
    }
  };

  const handleRemoveSkill = (skillId) => {
    setEditedSkills(prev => prev.filter(skill => skill.id !== skillId));
  };

  const handleSkillLevelChange = (skillId, newLevel) => {
    setEditedSkills(prev => 
      prev.map(skill => 
        skill.id === skillId ? { ...skill, level: newLevel } : skill
      )
    );
  };

  const handleSave = () => {
    onSkillsUpdate(editedSkills);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSkills(skills);
    setIsEditing(false);
  };

  const groupedSkills = editedSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Skills & Expertise</h2>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Icon name="Edit" size={16} className="mr-2" />
            Edit Skills
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium text-foreground mb-3">Add New Skill</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Skill name"
              value={newSkill.name}
              onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
            />
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              {Object.entries(skillCategories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
              className="px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              {Object.entries(proficiencyLevels).map(([level, { label }]) => (
                <option key={level} value={level}>{label}</option>
              ))}
            </select>
            <Button onClick={handleAddSkill} className="w-full">
              <Icon name="Plus" size={16} className="mr-2" />
              Add
            </Button>
          </div>
        </div>
      )}

      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="mb-6 last:mb-0">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon 
              name={category === 'technical' ? 'Code' : category === 'soft' ? 'Users' : 'Wrench'} 
              size={16} 
              className="text-primary" 
            />
            {skillCategories[category]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categorySkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-muted rounded-lg p-3 border border-border hover:border-primary transition-colors duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{skill.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${proficiencyLevels[skill.level].color}`}>
                        {proficiencyLevels[skill.level].label}
                      </span>
                      {skill.verified && (
                        <Icon name="CheckCircle" size={14} className="text-success" />
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="text-error hover:text-error"
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="mt-2">
                    <label className="text-xs text-muted-foreground">Proficiency Level</label>
                    <select
                      value={skill.level}
                      onChange={(e) => handleSkillLevelChange(skill.id, parseInt(e.target.value))}
                      className="w-full mt-1 px-2 py-1 text-xs border border-border rounded bg-input text-foreground"
                    >
                      {Object.entries(proficiencyLevels).map(([level, { label }]) => (
                        <option key={level} value={level}>{label}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="ThumbsUp" size={12} />
                      <span>{skill.endorsements} endorsements</span>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-full mr-1 ${
                            level <= skill.level ? 'bg-primary' : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(groupedSkills).length === 0 && (
        <div className="text-center py-8">
          <Icon name="Plus" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No skills added yet. Start building your profile!</p>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;