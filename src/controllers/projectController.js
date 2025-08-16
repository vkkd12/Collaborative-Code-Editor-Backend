import Project from '../models/Project.js';

export async function createProject(req, res) {
  console.log('Creating project for user named :');
  const project = await Project.create({
    name: req.body.name,
    description: req.body.description || '',
    owner: req.user._id
  });
  res.status(201).json({ success: true, data: project });
}

export async function listProjects(req, res) {
  console.log('Listing projects for user:', req.user);
  const projects = await Project.find({
    $or: [{ owner: req.user._id }, { members: req.user._id }]
  }).populate('owner', '_id username email');
  res.json({ success: true, data: projects });
}

export async function getProjectById(req, res) {
  const project = await Project.findById(req.params.projectId).populate('owner', '_id username email');
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.json({ success: true, data: project });
}

export async function updateProject(req, res) {
  const project = await Project.findByIdAndUpdate(
    req.params.projectId,
    { name: req.body.name, description: req.body.description },
    { new: true }
  );
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.json({ success: true, data: project });
}

export async function deleteProject(req, res) {
  const deleted = await Project.findByIdAndDelete(req.params.projectId);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.status(204).send();
}

export async function joinProject(req, res) {
  const projectId = req.body.projectId;
  const userId = req.session.user._id;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  if (String(project.owner) === String(userId)) {
    return res.status(400).json({ success: false, message: 'Cannot join your own project' });
  }
  if (project.members.includes(userId)) {
    return res.status(400).json({ success: false, message: 'Already joined this project' });
  }
  project.members.push(userId);
  await project.save();
  res.json({ success: true, data: project });
}

export async function leaveProject(req, res) {
  const projectId = req.body.projectId;
  const userId = req.session.user._id;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  if (String(project.owner) === String(userId)) {
    return res.status(400).json({ success: false, message: 'Owner cannot leave their own project. Use delete instead.' });
  }
  const idx = project.members.findIndex(m => String(m) === String(userId));
  if (idx === -1) {
    return res.status(400).json({ success: false, message: 'You are not a member of this project.' });
  }
  project.members.splice(idx, 1);
  await project.save();
  res.json({ success: true, data: project });
}