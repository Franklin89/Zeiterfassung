#region (C) ML-Software.ch, Zollikofen, Switzerland 2015
//  Filename:  Project.cs
//  Date: 26/08/2015
//  Author:  Matteo Locher
//  CONTENS:
//  DESCRIPTION: 
//  ----------------------------------------------------------------------------
//  Copyright (c) 2015. This software is subject to copyright protection under
//  the laws of Switzerland, European Union and other countries. This software is
//  the private properties of ML-Software.ch, Zollikofen, Switzerland and can not be
//  reproduced, distributed or given to a third party without the written consent
//  of ML-Software.ch.
#endregion

using System.Collections.Generic;

namespace Backend.Models
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual List<Task> Tasks { get; set; } = new List<Task>();

        public virtual List<User> Users { get; set; } = new List<User>();

        public virtual List<UserTask> UserTasks { get; set; } = new List<UserTask>();
    }
}